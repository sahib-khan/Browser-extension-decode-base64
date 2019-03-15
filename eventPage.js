var contextMenuItem = {
    "id":"selected_text",
    "title":"Decode Text",
    "contexts":["selection"]
};

chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create(contextMenuItem);  
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
        decodedString= "https://"+decodedString;
        chrome.tabs.create({ url: decodedString });
    }
    
})