const highlightColor = "rgb(213, 234, 255)";

const template = `
  <template id="highlightTemplate">
    <span class="highlight" style="background-color: ${highlightColor}; display: inline"></span>
  </template>

  <button id="mediumHighlighter">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#f5f5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
  </button>
`;

const styled = ({ display = "none", left = 0, top = 0 }) => `
  #mediumHighlighter {
    align-items: center;
    background-color: black;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    display: ${display};
    justify-content: center;
    left: ${left}px;
    padding: 5px 10px;
    position: fixed;
    top: ${top}px;
    width: 40px;
    z-index: 9999;
  }
  .text-marker {
    fill: white;
  }
  .text-marker:hover {
    fill: ${highlightColor};
  }
`;

class MediumHighlighter extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  get markerPosition() {
    return JSON.parse(this.getAttribute("markerPosition") || "{}");
  }

  get styleElement() {
    return this.shadowRoot.querySelector("style");
  }

  get highlightTemplate() {
    return this.shadowRoot.getElementById("highlightTemplate");
  }

  static get observedAttributes() {
    return ["markerPosition"];
  }

  render() {
    this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = styled({});
    this.shadowRoot.appendChild(style);
    this.shadowRoot.innerHTML += template;
    this.shadowRoot
      .getElementById("mediumHighlighter")
      .addEventListener("click", () => this.highlightSelection());
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "markerPosition") {
      this.styleElement.textContent = styled(this.markerPosition);
    }
  }

  highlightSelection() {

    console.log("HIGHLIGHTING!")

    //first highlight the selection
    var userSelection = window.getSelection();
    for (let i = 0; i < userSelection.rangeCount; i++) {
      this.highlightRange(userSelection.getRangeAt(i));
    }
    
    // set the url 
    const currentUrl = window.location.href
    chrome.storage.local.set({'url': currentUrl}, () => {
      console.log("saved url")
    })

    // get the url
    chrome.storage.local.get('url', (data) => {
      console.log(data.url)
    })

    // chrome.storage.local.remove(currentUrl, () => {console.log("removedKey")})

    // set the snippet to the array
    chrome.storage.local.get(currentUrl, (data) => {
      if(data && data[currentUrl]){
        const snippets = data[currentUrl]
        console.log(snippets)

        snippets.push(userSelection.toString())

        chrome.storage.local.set({ [currentUrl]: snippets }, function() {
          console.log('Array changed.');
          window.getSelection().empty();
        });
      } else {
        console.log("BAD")

        chrome.storage.local.set({ [currentUrl]: [userSelection.toString()] }, function() {
          console.log('Array saved.');
          window.getSelection().empty();
        });
      }
    })

    // const snippets = JSON.parse(localStorage.getItem(currentUrl) || "[]")
    // snippets.push(userSelection.toString())
    // localStorage.setItem(window.location.href, JSON.stringify(snippets))

    // //now send it to react
    // chrome.runtime.sendMessage({
    //   from: "content.js",
    //   type: 0,
    //   message: userSelection.toString()
    // })

  }

  highlightRange(range) {
    const clone =
      this.highlightTemplate.cloneNode(true).content.firstElementChild;
    clone.appendChild(range.extractContents());
    range.insertNode(clone);
  }
}

window.customElements.define("medium-highlighter", MediumHighlighter);
