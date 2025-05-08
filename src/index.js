function svgButton(svgName, text, onclick) {
return `
    <div>
    <button onclick="${onclick}">
        ${window.SVG[svgName]}
        <p>${text}</p>
    </button>
    </div>`
}

const INTRO_HTML = `
<div class="svgButtonCollection">
    ${svgButton("computer", "Technical interests!", "loadPage('Tech')")}
    ${svgButton("seedling", "How are my plants doing?", "loadPage('Plants')")}
</div>
`;
PAGES = {
    "Plants": {
        html: "<p>Let's talk about my plants!</p><p>I have 3 columbines, a yard I'm working on, some young Japanese black pines, and more...</p>",
        path: "/plants.html"
    },
    "Tech": {
        html: "<p>I have lots of technical interests :) Coding from front-end to back to embedded and graphics!</p>",
        path: "/tech.html"
    },
    "Index": {
        html: INTRO_HTML,
        path: "/"
    }
};

window.addEventListener('popstate', (event) =>  {
    const path = event.target.location.pathname;
    windowOnLoad(path);
});

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

    if (window.location.pathname.endsWith('index.html')) {
        loadPage("Index");
    } else {
        console.log("Failed to determine page. Falling back to index.");
        loadPage("Index");
    }
}

window.onload = () => {
    console.log('path:', window.location.pathname);
    windowOnLoad(window.location.pathname);
}
