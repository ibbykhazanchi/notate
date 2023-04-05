import './App.css';
import {useEffect, useState} from 'react'

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

        {snippets && snippets.length > 0 && (
          <ul>
            {snippets.map(snippet => (
              <li>{snippet}</li>
            ))}
          </ul>
        )}

        <p>{url}</p>
      </header>
    </div>
  );
}

export default App;
