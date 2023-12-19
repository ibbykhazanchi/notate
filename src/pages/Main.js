import { useEffect, useState, useRef } from "react";
import { getFolders, sendSnippetsToNotion } from "../Notion";
import { Snippet, SearchableSelect } from "../components";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import Accordion from "react-bootstrap/Accordion";
import 'animate.css'

const Main = () => {
  const [url, setUrl] = useState("");
  const [snippets, setSnippets] = useState([]);
  const [title, setTitle] = useState("");
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const target = useRef(null);
  const [showAlert, setShowAlert] = useState(false);


  // gets the URL
  useEffect(() => {
    const queryInfo = { active: true, lastFocusedWindow: true };

    chrome.tabs &&
      chrome.tabs.query(queryInfo, (tabs) => {
        if (tabs[0] && tabs[0].url) {
          setUrl(tabs[0].url);
        }
      });
  }, []);

  useEffect(() => {
    // remove highlights
    if (snippets && snippets.length === 0) {
      window.document.querySelectorAll(".highlight").forEach((e) => {
        console.log(e);
        e.style.backgroundColor = null;
      });
    }
  }, [snippets]);

  // when the URL changes, you need to reload snippets
  useEffect(() => {
    chrome.storage.local.get(url, (data) => {
      setSnippets(data[url]);
    });
  }, [url]);

  // load folders
  useEffect(() => {
    const fetchData = async () => {
      const data = await getFolders();
      setFolders(data);
    };
    fetchData();
  }, []);

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const setFolder = (obj) => {
    setSelectedFolder(obj);
  };

  const handleSubmit = () => {
    if (!selectedFolder) {
      //shake & trigger a popup
      setShowAlert(true)
      const element = document.getElementById('shipButton')
      element.classList.add('animate__animated', 'animate__headShake');
      setTimeout(() => {
        setShowAlert(false);
        element.classList.remove('animate__animated', 'animate__headShake')
      }, 7000)
    } else {
      sendToNotionHandler();
    }
  };

  const sendToNotionHandler = () => {
    if (
      sendSnippetsToNotion(snippets, title, selectedFolder.id)
    ) {
      // clear snippets
      setSnippets([]);
      setTitle("");

      // delete cached snippets
      chrome.storage.local.remove(url);

      // remove highlights from html
      removeHighlights();
    }
  };

  const removeHighlights = () => {
    chrome.tabs.query({ active: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "remove-highlights" });
    });
  };

  return (
    <>
      <Container>

        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Body>
              <SearchableSelect options={folders || []} setFolder={setFolder} />
            </Accordion.Body>
            <Accordion.Header>
              {(selectedFolder && selectedFolder.title + " /") ||
                "Select a Page"}
            </Accordion.Header>
          </Accordion.Item>
        </Accordion>

        {snippets &&
          snippets.length > 0 &&
          snippets.map((snip, index) => {
            return index === 0 ? (
              <div className="m-2 mt-3" key={index}>
                <Snippet text={snip} />
              </div>
            ) : (
              <div className="m-2" key={index}>
                <Snippet text={snip} />
              </div>
            );
          })}
            
          <div className="fixed-bottom text-center mb-3" style={{zIndex:2}}>
            <Button variant="primary" ref={target} onClick={handleSubmit} id="shipButton"> Send to Notion 🚀 </Button>
            <Overlay target={target.current} show={showAlert} placement="top">
            {(props) => (
              <Tooltip id="overlay-example" {...props}>
                you must provide a valid notion folder
              </Tooltip>
            )}
          </Overlay>
          </div>

      </Container>
    </>
  );
};

export default Main;
