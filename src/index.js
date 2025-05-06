function svgButton(svgName, text, onclick) {
return `
    <div>
    <button onclick="${onclick}">
        ${window.SVG[svgName]}
        ${text}
    </button>
    </div>`
}

const INTRO_HTML = `
<div class="svgButtonCollection">
    ${svgButton("computer", "Technical interests!", "alert('...')")}
    ${svgButton("seedling", "How are my plants doing?", "loadPage('Plants')")}
</div>
`;
PAGES = {
    "Plants": {
        html: "<p>Let's talk about my plants!</p><p>I have 3 columbines, a yard I'm working on, some young Japanese black pines, and more...</p>",
        path: "plants.html"
    },
    "Index": {
        html: INTRO_HTML,
        path: "/"
    }
};

window.addEventListener('popstate', (event) =>  {
    const path = event.target.location.pathname;
    for(const page of Object.keys(PAGES)) {
        if(PAGES[page].path === path) {
            loadPage(page);
        }
    }
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

function windowOnLoad() {
    if (window.location.pathname.endsWith('index.html')) {
        loadPage("Index", false);
    } else {
        console.log("Failed to determine page. Falling back to index.");
        loadPage("Index", false);
    }
}

window.onload = () => {
    console.log('path:', window.location.pathname);
    windowOnLoad();
}
