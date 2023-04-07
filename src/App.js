import './App.css';
import { useEffect, useState } from 'react'
import { sendToNotion } from './Notion';

function App() {

  const [url, setUrl] = useState("")
  const [snippets, setSnippets] = useState([])


  useEffect(() => {
    const queryInfo = {active: true, lastFocusedWindow: true}

    chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
      setUrl(tabs[0].url)
    })
  }, [])

  useEffect(() => {
    chrome.storage.local.get(url, (data) => {
      setSnippets(data[url])
    })
  }, [url])

  
  return (
    <div className="App">
      <header className="App-header">

        <p> Notes {url ? `for ${url}` : ''} </p>
        {snippets && snippets.length > 0 && (
          <ul>
            {snippets.map(snippet => (
              <li>{snippet}</li>
            ))}
          </ul>
        )}

        <button onClick={ () => sendToNotion(snippets) }> Send to Notion! </button>

      </header>
    </div>
  );
}

export default App;
