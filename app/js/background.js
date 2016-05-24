/**
 * define available bootswatch themes.
 */
var bootswatchThemes =
{
  "version": "3.3.6",
  "themes": [
    {
      "name": "Cerulean",
      "description": "A calm blue sky",
      "cssCdn": "https://maxcdn.bootstrapcdn.com/bootswatch/latest/cerulean/bootstrap.min.css"
    },
    {
      "name": "Cosmo",
      "description": "An ode to Metro",
      "cssCdn": "https://maxcdn.bootstrapcdn.com/bootswatch/latest/cosmo/bootstrap.min.css"
    },
    {
      "name": "Cyborg",
      "description": "Jet black and electric blue",
      "cssCdn": "https://maxcdn.bootstrapcdn.com/bootswatch/latest/cyborg/bootstrap.min.css"
    },
    {
      "name": "Darkly",
      "description": "Flatly in night mode",
      "cssCdn": "https://maxcdn.bootstrapcdn.com/bootswatch/latest/darkly/bootstrap.min.css"
    },
    {
      "name": "Flatly",
      "description": "Flat and modern",
      "cssCdn": "https://maxcdn.bootstrapcdn.com/bootswatch/latest/flatly/bootstrap.min.css"
    },
    {
      "name": "Journal",
      "description": "Crisp like a new sheet of paper",
      "cssCdn": "https://maxcdn.bootstrapcdn.com/bootswatch/latest/journal/bootstrap.min.css"
    },
    {
      "name": "Lumen",
      "description": "Light and shadow",
      "cssCdn": "https://maxcdn.bootstrapcdn.com/bootswatch/latest/lumen/bootstrap.min.css"
    },
    {
      "name": "Paper",
      "description": "Material is the metaphor",
      "cssCdn": "https://maxcdn.bootstrapcdn.com/bootswatch/latest/paper/bootstrap.min.css"
    },
    {
      "name": "Readable",
      "description": "Optimized for legibility",
      "cssCdn": "https://maxcdn.bootstrapcdn.com/bootswatch/latest/readable/bootstrap.min.css"
    },
    {
      "name": "Sandstone",
      "description": "A touch of warmth",
      "cssCdn": "https://maxcdn.bootstrapcdn.com/bootswatch/latest/sandstone/bootstrap.min.css"
    },
    {
      "name": "Simplex",
      "description": "Mini and minimalist",
      "cssCdn": "https://maxcdn.bootstrapcdn.com/bootswatch/latest/simplex/bootstrap.min.css"
    },
    {
      "name": "Slate",
      "description": "Shades of gunmetal gray",
      "cssCdn": "https://maxcdn.bootstrapcdn.com/bootswatch/latest/slate/bootstrap.min.css"
    },
    {
      "name": "Spacelab",
      "description": "Silvery and sleek",
      "cssCdn": "https://maxcdn.bootstrapcdn.com/bootswatch/latest/spacelab/bootstrap.min.css"
    },
    {
      "name": "Superhero",
      "description": "The brave and the blue",
      "cssCdn": "https://maxcdn.bootstrapcdn.com/bootswatch/latest/superhero/bootstrap.min.css"
    },
    {
      "name": "United",
      "description": "Ubuntu orange and unique font",
      "cssCdn": "https://maxcdn.bootstrapcdn.com/bootswatch/latest/united/bootstrap.min.css"
    },
    {
      "name": "Yeti",
      "description": "A friendly foundation",
      "cssCdn": "https://maxcdn.bootstrapcdn.com/bootswatch/latest/yeti/bootstrap.min.css"
    }
  ]
}

/**
 * get user's preferred bootswatch theme.
 */
function getUserBootswatchTheme() {
  var themeName = getUserBootswatchThemeName();
  for (var i = 0; i < bootswatchThemes.themes.length; i++) {
      if (bootswatchThemes.themes[i].name == themeName) {
        return bootswatchThemes.themes[i];
      }
  }
  console.log("no user bootswatch theme is found");
}

/**
 * get the name of user's preferred bootswatch theme.
 */
function getUserBootswatchThemeName() {
  var name = localStorage["UserBootstrapThemeName"];
  if (name == undefined) {
    name = "Readable";
  }
  return name;  
}


/**
 * save user's preferred theme to local storage.
 */
function saveUserPreference(bootswatchThemeName) {
  localStorage["UserBootstrapThemeName"] = bootswatchThemeName;
}

/**
 * Listen and respond to messages sent from content script
 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method == "getUserBootswatchTheme") {
    // respond with preferred theme.
    sendResponse({ theme: getUserBootswatchTheme() });
  }
});