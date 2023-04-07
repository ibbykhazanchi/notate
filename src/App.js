import './App.css';
import { useEffect, useState } from 'react'
import { sendSnippetsToNotion } from './Notion';
import { TitleForm } from './components';

function App() {

  const [url, setUrl] = useState("")
  const [snippets, setSnippets] = useState([])
  const [title, setTitle] = useState('')


  useEffect(() => {
    const queryInfo = {active: true, lastFocusedWindow: true}

    chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
      setUrl(tabs[0].url)
    })

    chrome.storage.local.get('notionPageTitle', (data) => {
      if(data.notionPageTitle){
        setTitle(data.notionPageTitle)
      }
    })
  }, [])

  // when the URL changes, you need to reload snippets and title
  useEffect(() => {
    chrome.storage.local.get(url, (data) => {
      setSnippets(data[url])

      //try to get the saved title
      chrome.storage.local.get(`${url}:notionPageTitle`, (data) => {
        if(data[`${url}:notionPageTitle`]) {
          setTitle(data[`${url}:notionPageTitle`])
        } else {
          setTitle('')
        }
      })
    })
  }, [url])

  const formOnEnter = (event) => {
    if (event.keyCode === 13) { // Check for Enter key press
      event.preventDefault();

      const titleForm = document.getElementById("title-form")
      const inputTitle = titleForm.value
      titleForm.blur(); // Remove focus from input

      setTitle(inputTitle)

      // now cache it
      const key = `${url}:notionPageTitle`
      chrome.storage.local.set({ [ key ]: inputTitle})
    }
  };

  const handleChange = (event) => {
    setTitle(event.target.value)
  }

  return (
    <div className="App">
      <TitleForm 
      
        inputValue={title} 
        handleInputKeyDown = {formOnEnter}
        handleChange = { handleChange }
 
      />

      <button onClick={ () => sendSnippetsToNotion(snippets, title) }> Send to Notion! </button>
  
      {snippets && snippets.length > 0 && (
        <ul>
          {snippets.map(snippet => (
            <li> { snippet } </li>
          ))}
        </ul>
      )}

    </div>
  );
}

export default App;
