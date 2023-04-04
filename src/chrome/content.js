const messagesFromReactAppListener = (message, sender, response) => {
    console.log('[content.js]. Message received', {
        message,
        sender
    })

    if(
        sender.id === chrome.runtime.id &&
        message.from === "react" &&
        message.message === "hello from react"
    ) {
        response('hello from content.js')
    }

    if(
        sender.id === chrome.runtime.id &&
        message.from === 'react' &&
        message.message === "delete logo"
    ) {
        const logo = document.getElementById('hplogo')
        logo.parentElement.removeChild(logo)
    }
}

const mediumHighlighter = document.createElement("medium-highlighter");
document.body.appendChild(mediumHighlighter);

const setMarkerPosition = (markerPosition) =>
  mediumHighlighter.setAttribute(
    "markerPosition",
    JSON.stringify(markerPosition)
  );

const getSelectedText = () => window.getSelection().toString();

document.addEventListener("click", () => {
  if (getSelectedText().length > 0) {
    setMarkerPosition(getMarkerPosition());
  }
});

document.addEventListener("selectionchange", () => {
  if (getSelectedText().length === 0) {
    setMarkerPosition({ display: "none" });
  }
});

function getMarkerPosition() {
  const rangeBounds = window
    .getSelection()
    .getRangeAt(0)
    .getBoundingClientRect();
  return {
    // Substract width of marker button -> 40px / 2 = 20
    left: rangeBounds.left + rangeBounds.width / 2 - 20,
    top: rangeBounds.top - 30,
    display: "flex",
  };
}


// const higlightedTextListener = () => {
//     const selectedText = getSelectedText()
//     if(selectedText && selectedText.length > 0){
//         console.log(selectedText)
//     }
//     chrome.runtime.sendMessage({
//         from: "content.js",
//         type: 0,
//         message: selectedText
//     })
// }

const main = () => {
    console.log('[content.js] main')
    // document.addEventListener("selectionchange", higlightedTextListener)
    chrome.runtime.onMessage.addListener(messagesFromReactAppListener)
}

main()
