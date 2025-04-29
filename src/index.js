const INTRO_HTML = `<h1>Keith Stellyes' Page</h1>
<p>This page as of May 6, 2025 is under construction, mind the dust :)</p>

</hr>
<div class="svgButton">
${window.SVG.computer}
<p>Technical interests!</p>
</div>
<div class="svgButton">
${window.SVG.seedling}
<p>How are my plants doing?!</p>
</div>
</hr>
`;

function onIndex() {
    const contentElement = document.getElementById("content");
    contentElement.innerHTML = INTRO_HTML;

    const svgels = document.getElementsByTagName("svg");
    for(const el of svgels) {
        el.setAttribute("width", "100px");
        el.setAttribute("height", "100px");
    }
}

window.onload = () => {
    onIndex();
}
