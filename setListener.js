chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
    console.log(request.action);
    if (request.action == 'GETURL') {
        sendResponse({
            url:location.href
        });
    }
    if (request.action == 'SETURL') {
        setURL(request.url);
        sendResponse({
            url: location.href
        });
    }
    if (request.action == "SELECTTERM"){
        selectTerm();
    }
    if (request.action == "GO2CS"){
        goToCSList();
    }
});


function setURL(url){
    location.href = url;
}

function selectTerm(){
    document.getElementsByTagName('option')[1].selected = 'selected';
    document.getElementsByTagName('input')[3].click();
}

function goToCSList(){
    var search = document.getElementsByName('SUB_BTN')[0];
    var options = document.getElementsByTagName('option');
    for(var i = 0; i<options.length;i++){
        options[i].selected=false;
    }
    // 54th is computer science
    options[53].selected=true;
    search.click();
}

console.log(123);