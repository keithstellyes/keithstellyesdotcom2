/*
 * Code for handling rendering and routing on my webpage.
 * When ran without defined window, it will print out the PAGES variable for use in
 * build scripts.
 */

function svgButton(svgName, text, onclick) {
    if(typeof window !== 'undefined') {
        return `
        <div>
        <button onclick="${onclick}">
            ${window.SVG[svgName]}
            <p>${text}</p>
        </button>
        </div>`
    } else {
        return `svgButton(${text}`;
    }
}

const INTRO_HTML = `
<div class="svgButtonCollection">
    ${svgButton("computer", "Technical interests!", "loadPage('Tech')")}
    ${svgButton("seedling", "How are my plants doing?", "loadPage('Plants')")}
</div>
`;

const TECH_HTML = `
<p>I have lots of technical interests :) Coding from front-end to back to embedded and graphics!</p>
<p>You should check out my GitHub! I have also contributed to Open-Source projects like RayLib</p>
<p>This page itself is a hand-rolled SPA app, where when you load a new page, it just replaces what needs to be! I also set up
browser history to make sure the browser back and history functionality work :)</p>
`;
PAGES = {
    "Plants": {
        html: "<p>Let's talk about my plants!</p><p>I have 3 mature columbines, several babies, many tomato plants from cherry varieties to roma!</p>",
        path: "/plants.html"
    },
    "Tech": {
        html: TECH_HTML,
        path: "/tech.html"
    },
    "Index": {
        html: INTRO_HTML,
        path: "/"
    }
};



function loadPage(page, pushHistory=true) {
    console.log("Loading the page:", page);
    if(pushHistory) {
        historyPush(page);
    }
    const contentElement = document.getElementById("content");
    contentElement.innerHTML = PAGES[page].html;
}


function historyPush(page) {
    try {
        window.history.pushState({page: page}, page, PAGES[page].path);
    } catch(e) {
        if (e.name === "SecurityError") {
            console.log("Can't push to history:", e);
        } else {
            console.log("Not SecurityError, bubbling up...");
            throw e;
        }
    }
}

function windowOnLoad(path) {
    for(const page of Object.keys(PAGES)) {
        if(PAGES[page].path === path) {
            loadPage(page);
            return;
        }
    }

    if (window.location.pathname.endsWith('/')) {
        loadPage("Index");
    } else {
        console.log("Failed to determine page. Falling back to index.");
        loadPage("Index");
    }
}
if(typeof window !== 'undefined') {
    window.addEventListener('popstate', (event) =>  {
        const path = event.target.location.pathname;
        windowOnLoad(path);
    });

    window.onload = () => {
        console.log('path:', window.location.pathname);
        windowOnLoad(window.location.pathname);
    }
} else {
    console.log(JSON.stringify(PAGES));
}
