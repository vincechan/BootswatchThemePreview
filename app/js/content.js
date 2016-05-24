/**
 * Send a message to background script to get the saved theme and apply it to current page.
 */
chrome.runtime.sendMessage({method: "getUserBootswatchTheme"}, function(response) {    
    var link = document.getElementById("injected-bootswatch-theme");
    if (link) {
        // We have already injected a bootswatch theme on this page, update the path instead of creating additional link
        link.href = response.theme.cssCdn;
    }
    else {
        var link = document.createElement( "link" );
        link.href = response.theme.cssCdn;
        link.type = "text/css";
        link.rel = "stylesheet";
        link.id = "injected-bootswatch -theme";
        document.body.appendChild(link);  
    }
});
