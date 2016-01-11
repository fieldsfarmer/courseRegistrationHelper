//register Listener
// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     console.log(sender);
//     if (sender.tab) {
//       console.log('tab');
//     } else {
//       console.log('content');
//     }
//   });

var URLs = {
  RegistrationAndRecords:'https://ui2web1.apps.uillinois.edu/BANPROD1/twbkwbis.P_GenMenu?name=bmenu.P_StuMainMnu',
  SelecATerm:'https://ui2web1.apps.uillinois.edu/BANPROD1/bwskfcls.p_sel_crse_search',
  ChooseMajor:'https://ui2web1.apps.uillinois.edu/BANPROD1/bwckgens.p_proc_term_date'
};

var newPageLoaded = true;

$go2CSList = $('#button');

$go2CSList.on('click', function(){
  setCurURL(URLs.SelecATerm);
  selectTerm();
  go2CSList();
});

function setListener(){
  chrome.tabs.executeScript(null, {
    file: "setListener.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.extension.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.extension.lastError.message;
    }
  });
}

// chrome.extension.sendMessage({
//     action: "getSource",
//     source: 'DOMtoString(document)'
// });



function getCurURL(){
    var curUrl = '';
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "GETURL"}, function(response) {
          curUrl = response.url;
        });
    });
    return curUrl;
}

function selectTerm(){
    if(newPageLoaded){
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "SELECTTERM"}, function(response) {
         newPageLoaded = false;
        });
      });
    } else {
      setTimeout(selectTerm, 50);
    }
}

function setCurURL(url){
  newPageLoaded = false;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "SETURL",
          url:url
        }, function(response) {
          testPageLoaded(url);
        });
    });
}

function testPageLoaded(url){
  chrome.tabs.getSelected(function(tab){
    if(tab.url == url){
      setListener();
      setTimeout(function(){
        console.log(tab.url);
        newPageLoaded = true;
      }, 100);
    } else {
      setTimeout(function(){testPageLoaded(url)}, 100);
    }
  });
}

function getURL(){
  var url = '';
  chrome.tabs.getSelected(function(tab){
    url = tab.url;
  });
  return url;
}

function go2CSList(){
  url1 = ''
  chrome.tabs.getSelected(function(tab){
    url1 = tab.url;
    //console.log("url1: " + url1);
    //console.log(url1 == URLs.ChooseMajor);
    if(url1 == URLs.ChooseMajor){
      setListener();
      setTimeout(function(){
        console.log("sent GO2CS");
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {action: "GO2CS"}, function(response) {
           newPageLoaded = false;
          });
        });
      }, 100);
      
    } else {
      console.log(234);
      setTimeout(go2CSList, 50);
    }
  });
  
}

setListener();