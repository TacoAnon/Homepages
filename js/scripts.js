/*
    AUTHR: TacoAnon
    DESCR: Personal startpage
    BRWSR: Mozilla Firefox (Tested in WaterFox 35)
    NOTES: - I mainly restrict mnu label length and the amount of available mnus because it goes out of the con otherwise.
           - If you widen up the cons you should be able to fit more, but you're on your own if you do so.
*/

var $ = function (id) {
    return document.getElementById(id);
};

var bangs = [
    ["!bbt", "http://bakabt.me/browse.php?q=", "BakaBT"],
    ["!ddg", "https://duckduckgo.com/?q=", "DuckDuckGo"],
    ["!g", "https://www.google.com/#q=", "Google"],
    ["!gi", "https://www.google.com/search?tbm=isch&q=", "Google Images"],
    ["!imdb", "http://www.imdb.com/find?q=", "IMDB"],
    ["!ud", "http://www.urbandictionary.com/define.php?term=", "Urban Dictionary"],
    ["!wp", "http://en.wikipedia.org/w/index.php?search=", "Wikipedia"],
    ["!yt", "https://www.youtube.com/results?search_query=", "YouTube"]
];

var mnus = [ // mnu Titles "Title",
    "Animu",
    "Social",
    "4chan",
    "Gaming",
    "Code/Rice",
    "Other"
];

var showFavicon = true; // Enable/Disable Favicons

// Link setup (separate with ["", "", ""],)
// Format: ["Name", "URL", "Custom Favicon"],
var links = [
    // Animu/Mango
    ["BakaBT",                      "http://www.bakabt.me/",                ""],
    ["Nyaa Tracker",                "http://www.nyaa.se/",                  ""],
    ["MyAnimeList",                 "http://myanimelist.net/",              ""],
    ["Anime News Network",          "http://www.animenewsnetwork.com/",     ""],
    ["Neregate",                    "http://www.neregate.com/",             ""],
    
    ["", "", ""], //Social
    
    ["YouTube",                     "http://youtube.com",                   ""],
    ["Reddit",                      "http://reddit.com",                    ""],
    ["DeviantArt",                  "http://deviantart.com/",               ""],
    ["Facebook",                    "http://facebook.com",                  ""],
    
    ["", "", ""], //4chan
    
    ["/a/ - Animu & Mango",         "https://boards.4chan.org/a/",          "http://s.4cdn.org/image/favicon-ws.ico"],
    ["/b/ - Random",                "https://boards.4chan.org/b/",          ""],
    ["/f/ - Flash",                 "https://boards.4chan.org/f/",          ""],
    ["/g/ - Technology",            "https://boards.4chan.org/g/",          "http://s.4cdn.org/image/favicon-ws.ico"],
    ["/wg/ - Wallpaper General",    "https://boards.4chan.org/wg/",         ""],
    
    ["", "", ""], //Gaming
    
    ["osu!",                        "http://osu.ppy.sh/",                   "http://s.ppy.sh/favicon.ico"],
    ["KiraNico",                    "http://kiranico.com/en/mh4u",          "http://kiranico.com/favicon.png"],
    ["Steam",                       "http://store.steampowered.com/",       ""],
    ["HumbleBundle",                "https://www.humblebundle.com/",        ""],
    
    ["", "", ""], //Code
    
    ["GitHub",                      "http://github.com/",                   ""],
    ["Pastebin",                    "http://pastebin.com",                  ""],
    ["JSFiddle",                    "http://jsfiddle.net/",                 ""],
    ["StackOverflow",               "http://stackoverflow.com/",            ""],
    ["Wallgig",                     "http://wallgig.net",                   ""],
    ["Wallhaven",                   "http://alpha.wallhaven.cc",            ""],
    ["Userstyles",                  "http://userstyles.org/",               ""],
    
    ["", "", ""], //Other
    
    ["Gmail",                       "https://gmail.com/",                   "https://ssl.gstatic.com/ui/v1/icons/mail/images/favicon5.ico"],
    ["Puush",                       "http://puush.me/",                     ""],
    ["Amazon",                      "http://www.amazon.com/",               ""],
    ["Google Drive",                "http://drive.google.com",              ""],
    ["Dropbox",                     "https://www.dropbox.com",              "https://cf.dropboxstatic.com/static/images/favicon-vflk5FiAC.ico"],
    ["Netflix",                     "http://netflix.com",                   ""],
    ["Weather",                     "http://www.weather.com/",              ""],
    ["Kickass Torrents",            "http://kickass.to",                    ""]
];

var hlpMnuMaxHgt = 86;

var ss = ""; //Leave empty
var defss = "!ddg"; //default bang

function init() {

    for (var i = 0; i < bangs.length; i++) {
        if (bangs[i][0] === defss) {
            ss=bangs[i][1];
            $('qry').placeholder = bangs[i][2];
            break;
        }
    }

    if (ss === "") { alert("Error: Missing default search engine!"); }

    hlpMnuMaxHgt += (bangs.length * 15);

    build();
    $('qry').value = "";
}

function build() { /*Code heavily based off of Twily's v4 homepage.*/

    // Build Bang List
    for (var i = 0; i < bangs.length; i++) {
        $('bngLst').innerHTML += "<li><b>" + bangs[i][0] + "</b> - " + bangs[i][2] + "</li>";
    }

    // Build categoryList
    $('mnu').innerHTML = "";
    if (mnus.length > 8) {
        alert("Too many menu Categories. Please restrict to 6 or less.");
        return;
    }

    for (i = 0; i < mnus.length; i++) { // Build mnu buttons
        if (mnus[i].length > 10) {
            alert("group label \"" + mnus[i] + "\" is too long. Please restrict to 10 or less characters. Skipping group label.");
            continue;
        } else {
            $('mnu').innerHTML += "<li id=\"mnuItm_" + (i+1) + "\" class=\"mnuItm\"><label id=\"mnuItmLbl_" + (i+1) + "\">" + mnus[i] + "</label><div class=\"subMnuCon\"><ul id=\"subMnu_" + (i+1) + "\" class=\"subMnu con\"></ul></div></li>";
        }
    }


    //Build mnus
    var m = 1,
        skip = false;

    for (i = 0; i < links.length; i++) { // mnu links
        if (links[i][0] === "" && links[i][1] === "") {
            skip = true;
        }

        if (!skip) {
            var printimg = "";

            if (showFavicon) {
                var favicon = "";
                if (links[i][2] !== "") {
                    favicon = links[i][2];
                } else {
                    favicon = getFavicon(links[i][1]);
                }
                
                printimg = "<img id=\"img_" + i + "\" src=\"" + favicon + "\"" + " onload=\"javascript:this.style.visibility='inherit';\" /> ";
            }


            $('subMnu_' + m).innerHTML += "<li class='subMnuItm'><a href=\"" + links[i][1] + "\" target=\"_self\">" + printimg + links[i][0] + "</a></li>";
        } else {
            skip = false;
            m++;
        }
    }
}

function handleQuery(e, q) { // Handle search query. based off of twily's v4 homepage.
    var key = e.keyCode || e.which;

    if (key === 13) { // enter
        var qList = q.split(" ");

        if (qList[0].charAt(0) === "!") { //does the query call a bang

            for (var i = 0; i < bangs.length; i++) { //find which bang was called
                if (bangs[i][0] === qList[0]) {
                    ss = bangs[i][1];
                    $('qry').placeholder = bangs[i][2];
                    break;
                }
            }

            if (qList.length > 1) {
                qList.splice(0,1);
                window.location = ss + qList.join(" ").replace(/&/g, "%26").trim();
            } else {
                $('qry').value = "";
            }
        } else { // where bang not specified, use selected search
            window.location = ss + q.replace(/&/g, "%26");
        }
    }
}

var m = false;

function toggleHelp() { // Toggle help
    m = !m;
    if (m) {
        $('hlpCon').style.opacity = "1";
        $('hlpCon').style.maxHeight = hlpMnuMaxHgt + "px";
        $('hlpCon').style.marginTop = "0";

    } else {
        $('hlpCon').style.opacity = "0";
        $('hlpCon').style.maxHeight = 0;
        $('hlpCon').style.marginTop = "-14px";
    }
}

function getFavicon(url) {
    var l = document.createElement("a");
    l.href = url;

    return l.protocol + "//" + l.hostname + "/favicon.ico";
}