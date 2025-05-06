function svgButton(svgName, text) {
return `
    <div>
    <button onclick="alert('TODO: respond to ${text}')">
        ${window.SVG[svgName]}
        ${text}
    </button>
    </div>`
}

const INTRO_HTML = `<h1>Keith Stellyes' Page</h1>
<p>This page as of May 6, 2025 is under construction, mind the dust :)</p>

<div class="svgButtonCollection">
    ${svgButton("computer", "Technical interests!")}
    ${svgButton("seedling", "How are my plants doing?")}
</div>
`;

function windowOnLoad() {
    if (window.location.pathname.endsWith('index.html')) {
        loadIndex();
    } else {
        console.log("Failed to determine page. Falling back to index.");
        loadIndex();
    }
}

function loadIndex() {
    console.log('Loading index page.');
    const contentElement = document.getElementById("content");
    contentElement.innerHTML = INTRO_HTML;
}

window.onload = () => {
    console.log('path:', window.location.pathname);
    windowOnLoad();
}
