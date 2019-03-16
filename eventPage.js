var contextMenuItem1 = {
    "id":"selected_text",
    "title":"Decode Text",
    "contexts":["selection"]
};
var contextMenuItem2 = {
    "id":"newTab",
    "title":"Open Decoded Link in New Tab",
    "contexts":["selection"]
};
var e1 = true;

chrome.browserAction.onClicked.addListener(function(tab) {
    if(!e1){
        var contextMenuItem1 = {
            "id":"selected_text",
            "title":"Decode Text",
            "contexts":["selection"]
    };
        chrome.contextMenus.create(contextMenuItem1);
        console.log("n");
        e1=true;
    }
    else{
        chrome.contextMenus.remove("selected_text");
        console.log("y");
        e1=false;
    }    
 });

chrome.runtime.onInstalled.addListener(function() {
    e1=true;
    chrome.contextMenus.create(contextMenuItem1);
    chrome.contextMenus.create(contextMenuItem2);
  });

function copyStringToClipboard (string) {
    function handler (event){
        event.clipboardData.setData('text/plain', string);
        event.preventDefault();
        document.removeEventListener('copy', handler, true);
    }

    document.addEventListener('copy', handler, true);
    document.execCommand('copy');
}

chrome.contextMenus.onClicked.addListener(function(clickData){
    var decodedString ="";
    if (clickData.menuItemId == "selected_text" && clickData.selectionText){ 
        try{       
            decodedString = window.atob(clickData.selectionText);
        }
        catch(e){
            decodedString = "Not a valid base64 text";
        }
        console.log(decodedString);
        copyStringToClipboard(decodedString);
        decodedString= decodedString;
        copyStringToClipboard(decodedString);
    }
    if (clickData.menuItemId == "newTab" && clickData.selectionText){ 
        try{       
            decodedString = window.atob(clickData.selectionText);
        }
        catch(e){
            decodedString = "Not a valid base64 text";
        }
        console.log(decodedString);
        chrome.tabs.create({ url: "https://"+decodedString });
    }
})