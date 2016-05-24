document.addEventListener('DOMContentLoaded', function () {
    createBootswatchSelect();
    
    // When apply button is clicked
    document.getElementById("apply-button").addEventListener("click", function(){
        // Get the active tab
        chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
            // Save the selected them
            var bootswatchSelectList = document.getElementById("bootswatch-theme-select");
            var bootswatchThemeName = bootswatchSelectList.options[bootswatchSelectList.selectedIndex].value;
            chrome.extension.getBackgroundPage().saveUserPreference(bootswatchThemeName);
            
            // And inject content script to the active tab.
            chrome.tabs.executeScript({
                file: 'js/content.js'                
            });
        });        
    });
});

/**
 * Create the select list for bootstrap themes.
 */
function createBootswatchSelect() {
    var themes = chrome.extension.getBackgroundPage().bootswatchThemes.themes;
    var userThemeName = chrome.extension.getBackgroundPage().getUserBootswatchThemeName();
    var container = document.getElementById("bootswatch-theme-container");

    //Create and append select list
    var selectList = document.createElement("select");
    selectList.id = "bootswatch-theme-select";
    selectList.className = "form-control";
    container.appendChild(selectList);

    //Create and append the options
    for (var i = 0; i < themes.length; i++) {
        var theme = themes[i];
        var option = document.createElement("option");
        option.value = theme.name;
        option.text = theme.name + " | " + theme.description;        
        if (theme.name == userThemeName) {
            option.selected = true;
        }
        selectList.appendChild(option);        
    }
}
