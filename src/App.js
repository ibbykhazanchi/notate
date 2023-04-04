import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react'

function App() {
  const [url, setUrl] = useState(null)
  const [responseFromContent, setResponseFromContent] = useState('')
  const [highlightedSnippets, setHighlightedSnippets] = useState([])

  useEffect(() => {
    const queryInfo = {active: true, lastFocusedWindow:true}

    chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
      const url = tabs[0].url
      setUrl(url)
    })
  }, [])

  const sendTestMessage = async () => {
    const message = {
      from: "react",
      message: "hello from react"
    }

    const queryInfo = {
      active: true,
      currentWindow: true
    }

    chrome.tabs.query(queryInfo, (tabs) => {
      const currentTabId = tabs[0].id
      console.log(currentTabId)
      chrome.tabs.sendMessage(currentTabId, message, (response) => {
        setResponseFromContent(response)
      })
    })
  }

  const contentListener = (request, sender, sendResponse) => {
    if(request.from === "content.js" && request.type === 0){
      const snippet = request.message
      const snippetArr = highlightedSnippets.slice()
      snippetArr.push(snippet)
      setHighlightedSnippets(snippetArr)
    }
  }
  chrome.runtime.onMessage.addListener(contentListener)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p> { url } </p>

        <button onClick={sendTestMessage}> SEND MSG </button>

        <p> Response from content.js </p>
        <p>
          {responseFromContent}
        </p>

        {highlightedSnippets.length > 0 && (
          <ul>
            {highlightedSnippets.map(snippet => (
              <li>{snippet}</li>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
}

export default App;
