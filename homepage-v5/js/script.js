/*=====================================================================================================*/
/* Giving credit where credit is due, The JS is all built off of my original mod of Twily's homepage. */
/* If there are any similarities left, it's probably because it's based on his code.                 */
/*==================================================================================================*/

var $ = function(id) {
  return document.getElementById(id);
};
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var dayNames = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THRUSDAY", "FRIDAY", "SATURDAY"];

/*==============*/
/*== Options ==*/
/*============*/

var CookiePrefix = "taco_stpg_"; //prefix for cookies.
var cmdPrefix = "!"; //prefix for commands.
var ssi = 1; //set default search provider. Use array index of the array below. (Starting with 0)
// Format: [Keyword, Search URL (Search query replaces "{Q}"), "Input placeholder text"]
var searchSources = [
  ["bbt",      "http://bakabt.me/browse.php?q={Q}",                      "BakaBT"],
  ["g",        "https://www.google.com/#q={Q}",                          "google_logo"],
  ["im",       "https://www.google.com/search?tbm=isch&q={Q}",           "google_logo Images"],
  ["imdb",     "http://www.imdb.com/find?q={Q}",                         "IMDB"],
  ["nya",      "https://www.nyaa.se/?page=search&term={Q}",              "Nyaa Torrents"],
  ["ud",       "http://www.urbandictionary.com/define.php?term={Q}",     "Urban Dictionary"],
  ["wp",       "http://en.wikipedia.org/w/index.php?search={Q}",         "Wikipedia"],
  ["yt",       "https://www.youtube.com/results?search_query={Q}",       "YouTube"]
];

// Because I care about readability in my JS. kthx.
var svgClover  = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"m19.9 8.78c1.05-0.611 2.01-1.51 2.42-2.68 0.503-1.41 0.089-3.08-0.98-4.11-0.425-0.381-0.987-0.729-1.58-0.6-0.433 0.083-0.737 0.43-0.942 0.797-0.349-0.648-0.699-1.32-1.29-1.79-0.755-0.616-2-0.446-2.57 0.336-0.911 1.13-1.16 2.65-1.17 4.06 0.039 1.93 0.514 3.88 1.4 5.59 1.7-0.4 3.4-0.76 4.8-1.62z\"/><path d=\"m10.8 8.75c-0.275-1.71-0.664-3.44-1.54-4.94-0.536-0.929-1.29-1.77-2.28-2.23-1.25-0.62-2.86-0.42-3.98 0.43-0.55 0.41-1.04 1.01-1.05 1.72 0.009 0.507 0.366 0.908 0.787 1.14-0.842 0.422-1.77 0.9-2.17 1.8-0.302 0.64-0.05 1.39 0.42 1.86 0.75 0.77 1.81 1.13 2.84 1.32 2.37 0.35 4.81-0.14 6.97-1.1z\"/><path d=\"m9.12 13.5c-1.58 0.447-3.14 1.09-4.46 2.08-0.913 0.694-1.72 1.6-2.04 2.73-0.442 1.45 0.102 3.12 1.26 4.08 0.495 0.399 1.17 0.737 1.81 0.504 0.418-0.127 0.61-0.552 0.833-0.888 0.463 0.773 1.07 1.55 1.95 1.86 0.635 0.238 1.36-0.032 1.78-0.541 0.658-0.787 0.89-1.83 0.968-2.83 0.128-2.48-0.738-4.9-2.02-6.99l-0.06-0.1z\"/><path d=\"m22.8 15.2c-0.885-0.733-2.02-1.1-3.14-1.27-2.14-0.318-4.3 0.091-6.32 0.784 0.158 1.72 0.477 3.46 1.25 5.01 0.549 1.09 1.39 2.1 2.55 2.56 1.45 0.584 3.25 0.204 4.29-0.973 0.329-0.374 0.572-0.896 0.443-1.4-0.092-0.388-0.413-0.646-0.695-0.897 0.922-0.318 1.91-0.825 2.31-1.77 0.3-0.7-0.2-1.5-0.7-2z\"/></svg>";
var svgCode    = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M8,3A2,2 0 0,0 6,5V9A2,2 0 0,1 4,11H3V13H4A2,2 0 0,1 6,15V19A2,2 0 0,0 8,21H10V19H8V14A2,2 0 0,0 6,12A2,2 0 0,0 8,10V5H10V3M16,3A2,2 0 0,1 18,5V9A2,2 0 0,0 20,11H21V13H20A2,2 0 0,0 18,15V19A2,2 0 0,1 16,21H14V19H16V14A2,2 0 0,1 18,12A2,2 0 0,1 16,10V5H14V3H16Z\" /></svg>";
var svgGamepad = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M7,6H17A6,6 0 0,1 23,12A6,6 0 0,1 17,18C15.22,18 13.63,17.23 12.53,16H11.47C10.37,17.23 8.78,18 7,18A6,6 0 0,1 1,12A6,6 0 0,1 7,6M6,9V11H4V13H6V15H8V13H10V11H8V9H6M15.5,12A1.5,1.5 0 0,0 14,13.5A1.5,1.5 0 0,0 15.5,15A1.5,1.5 0 0,0 17,13.5A1.5,1.5 0 0,0 15.5,12M18.5,9A1.5,1.5 0 0,0 17,10.5A1.5,1.5 0 0,0 18.5,12A1.5,1.5 0 0,0 20,10.5A1.5,1.5 0 0,0 18.5,9Z\" /></svg>";
var svgMore    = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z\" /></svg>";
var svgSocial  = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z\" /></svg>";
var svgTrash   = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z\" /></svg>";

/* Header Format: ["(Label)", "(Accent Color)", "-HEAD-"],
*   - The labels are setup for 24px SVGs. by default they are separated from the linkMenu for readability.
*   - Accent color can be: black, white, blue, green, cyan, red, magenta, and yellow. by default, the accent color is white.
*   - ALL categories need a header to start them. Headers are signified by the -HEAD- in the 3rd position.
* Link Format: ["Name", "URL",""],
*   - Name and URL are pretty self explanitory. 
*   - 3rd position may be used in the future, but right now it's not used and can be left blank.
*/
// Also yes I could totally use a json object to represent the menus, but I didn't feel like reprogramming the whole script. Probably doing that next site, though.
var linkMenu = [
  [svgTrash,                   "blue",                                        "-HEAD-"], // Anime
  ["AnimeNewsNetwork",         "",""],
  ["MyAnimeList",              "",""],
  ["Nyaa Tracker",             "",""],
  ["BakaBT",                   "",""],
  
  [svgSocial,                  "green",                                       "-HEAD-"], // Media
  ["YouTube",                  "",""],
  ["Facebook",                 "",""],
  ["Reddit",                   "",""],
  ["Twitch",                   "",""],
  ["DeviantArt",               "",""],
  
  [svgClover,                  "cyan",                                        "-HEAD-"], // 4chan
  ["/a/ Anime & Manga",        "",""],
  ["/g/ Technology",           "",""],
  ["/w/ Anime/Wallpapers",     "",""],
  ["/wg/ Wallpaper/General",   "",""],
  
  [svgCode,                    "red",                                         "-HEAD-"], // FuelRats
  ["GitHub",                   "",""],
  ["Gist",                     "",""],
  ["JSFiddle",                 "",""],
  ["Stack Overflow",           "",""],
  
  [svgGamepad,                 "magenta",                                     "-HEAD-"], // Gaming
  ["Steam",                    "",""],
  ["Humble Bundle",            "",""],
  ["GOG.com",                  "",""],
  ["/r/gaming",                "",""],
  
  [svgMore,                    "yellow",                                      "-HEAD-"], // Other
  ["Gmail",                    "",""],
  ["Amazon",                   "",""],
  ["Dropbox",                  "",""],
  ["Netflix",                  "",""],
  ["Weather",                  "",""],
];
// DID I FORGET TO MENTION?! THE DEMO LINKS DO NOTHING!

/*==================*/
/*== Main Script ==*/
/*================*/

//core element vars
var searchInput = $('searchBar');
var rootMenuUL = $('categoryMenu');
var dateDiv = $('dateContainer');
var notesTextarea = $('notesInput');

function init() {
  initSearchBar();
  buildDate();
  buildMenu();
  $('body').style.opacity = 1;
  $('mainContainer').style.opacity = 1;
  $('dateContainer').style.opacity = 1;
  $('notesWidget').style.opacity = 1;
}

function initSearchBar() {
  if (searchSources[ssi] !== undefined)
    searchInput.placeholder = searchSources[ssi][2];
  else {
    ssi = 0;
    searchInput.placeholder = "Do you know what you're doing?";
    alert("Error: default search engine setting is invalid!");
  }
  
  document.addEventListener('keydown', function(event) { handleKeydown(event); });
  
  searchInput.value = "";
}

function buildDate() {
  var today = new Date();
  dateDiv.innerHTML = "<font class=\"font-3em\">" +
                      monthNames[today.getMonth()] + 
                      " " + 
                      today.getDate() + 
                      "</font><br><font>" + 
                      dayNames[today.getDay()] + 
                      ", " + 
                      today.getFullYear() +
                      "</font>";
}

function buildMenu() {
  var newMenu = "";
  var accent = "";

  if(linkMenu[0][2] === "-HEAD-") {

    if (linkMenu[0][1] !== "") accent = linkMenu[0][1].toLowerCase();
    else accent = "white";

    newMenu += "<li class=\"button-container expanding-down\"><div class=\"button accent-" + accent + "\"><label class=\"button-content\">" + linkMenu[0][0] + "</label><div class=\"button-expanded-content\"><ul class=\"menu-link container\">";
  } else {
    alert("linkMenu is invalid. Ensure to start the list with a -HEAD- entry.");
  }
  for (var i = 1; i < linkMenu.length; i++) {
    if (linkMenu[i][2] === "-HEAD-") {

      if (linkMenu[i][1] !== "") accent = linkMenu[i][1].toLowerCase();
      else accent = "white";

      newMenu += "</ul></div></div></li><li class=\"button-container expanding-down\"><div class=\"button accent-" + accent + "\"><label class=\"button-content\">" + linkMenu[i][0] + "</label><div class=\"button-expanded-content\"><ul class=\"menu-link container\">";
    } else {
      newMenu += "<li class='menu-link-item'><a href=\"" + linkMenu[i][1] + "\" target=\"_self\"><label>" + linkMenu[i][0] + "</label></a></li>";
    }
  }
  newMenu +="</ul></div></div></li>";

  rootMenuUL.innerHTML = newMenu;
}

function handleQuery(event, query) {
  var key = event.keyCode || event.which;
  if(query !== "") {
    var qlist;
    if (key === 32) {
      qList = query.split(" ");
      if (qList[0].charAt(0) === cmdPrefix) {
        var keyword = "";
        for (var i = 0; i < searchSources.length; i++) {
          keyword = cmdPrefix + searchSources[i][0];
          if (keyword === qList[0]) {
            ssi = i;
            searchInput.placeholder = searchSources[ssi][2];
            searchInput.value = query.replace(keyword, "").trim();
            event.preventDefault();
            break;
          }
        }
      }
    } else if (key === 13) {
      qList = query.split(" ");
      if (qList[0].charAt(0) === cmdPrefix) {
        var keyword = "";
        for (var i = 0; i < searchSources.length; i++) {
          keyword = cmdPrefix + searchSources[i][0];
          if (keyword === qList[0]) {
            ssi = i;
            break;
          }
        }
        if (qList.length > 1) {
          window.location = searchSources[ssi][1].replace("{Q}", encodeURIComponent(query.replace(keyword, ""))).trim();
        } else {
          searchInput.placeholder = searchSources[ssi][2];
          searchInput.value = "";
        }
      } else {
        window.location = searchSources[ssi][1].replace("{Q}", encodeURIComponent(query));
      }
    } 
  }
  if (key === 27) {
    searchInput.blur();
  }
}

function handleNoteInput(event) {
  var key = event.keyCode || event.which;
  if (key === 27) {
    notesTextarea.blur();
  }
}

var noteText = null;
function handleNotes(event, focus){
  if (focus) {
    if(!noteText) {
      noteText = GetCookie("notes") || "";
    }
    notesTextarea.value = noteText;
    addClass('notesContainer', "active");
  } else {
    removeClass('notesContainer', "active");
    if(noteText !== notesTextarea.value) {
      noteText = notesTextarea.value;
      SetCookie("notes", noteText, 365 * 24 * 60 * 60 * 1000);
    }
  }
}

var ignoredKeys = [9,13,16,17,18,19,20,27,33,34,35,36,37,38,39,40,45,46,91,92,93,112,113,114,115,116,117,118,119,120,121,122,123,144,145];
function handleKeydown(event) {
  if(notesInput === document.activeElement) return;
  if(searchInput === document.activeElement) return;
  if (ignoredKeys.includes(event.keyCode)) return;
  searchInput.focus();
}

function addClass(elementID, className) {
  $(elementID).classList.add(className);
}
function removeClass(elementID, className) {
  $(elementID).classList.remove(className);
}

function GetCookie(name) {
    try {
        var cookie = document.cookie;
        name = CookiePrefix + name;
        var valueStart = cookie.indexOf(name + "=") + 1;
        if (valueStart === 0) {
            return null;
        }
        valueStart += name.length;
        var valueEnd = cookie.indexOf(";", valueStart);
        if (valueEnd == -1)
            valueEnd = cookie.length;
        return decodeURIComponent(cookie.substring(valueStart, valueEnd));
    } catch (e) {
      console.log(e);
    }
    return null;
}
function SetCookie(name, value, expire) {
    var temp = CookiePrefix + name + "=" + escape(value) + ";" + (expire !== 0 ? "expires=" + ((new Date((new Date()).getTime() + expire)).toUTCString()) + ";" : " path=/;");
    console.log(temp);
    document.cookie = temp;
}
function CanSetCookies() {
    SetCookie('CookieTest', 'true', 0);
    var can = GetCookie('CookieTest') !== null;
    DelCookie('CookieTest');
    return can;
}
function DelCookie(name) {
    document.cookie = fr.client.CookieBase + name + '=0; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}