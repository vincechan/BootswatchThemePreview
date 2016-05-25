document.addEventListener('DOMContentLoaded', function () {
    createBootswatchSelect();
    createBootswatchThumbnails();
    
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


/**
 * Create the thumbnails
 */
function createBootswatchThumbnails() {
    var themes = chrome.extension.getBackgroundPage().bootswatchThemes.themes;
    var container = document.getElementById("bootswatch-thumbnail-container");
    
    //Create and append the thumbnail images
    for (var i = 0; i < themes.length; i++) {
        (function() {
            var theme, div, a, img;
            theme = themes[i];
            
            div = document.createElement("div");
            div.className = "col-xs-3";
            
            a = document.createElement("a");
            a.className="thumbnail";
            a.href = "#";    
            
            img = document.createElement("img");
            img.className = "img-responsive";
            img.src = "img/" + theme.name + ".png";
            
            container.appendChild(div);
            div.appendChild(a);
            a.appendChild(img);
            
            // change the select list selected item when a thumbnail is clicked on.
            a.addEventListener("click", function(){
                console.log(theme.name);
                document.querySelector('#bootswatch-theme-select [value="' + theme.name + '"]').selected = true;
            });             
        }());  
    }
}