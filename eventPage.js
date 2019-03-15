var contextMenuItem = {
    "id":"selected_link",
    "title":"Decode Link",
    "contexts":["selection"]
};
chrome.contextMenus.create(contextMenuItem);
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
    if (clickData.menuItemId == "selected_link" && clickData.selectionText){ 
        try{       
            decodedString = window.atob(clickData.selectionText);
        }
        catch(e){
            decodedString = "Not a valid base64 text";
        }
        console.log(decodedString);
        copyStringToClipboard(decodedString);
    }
    
})