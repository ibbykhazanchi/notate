import { useEffect, useState } from "react";
import { getFolders, sendSnippetsToNotion } from "../Notion";
import { Snippet, SearchableSelect } from "../components";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";

const Main = () => {
  const [url, setUrl] = useState("");
  const [snippets, setSnippets] = useState([]);
  const [title, setTitle] = useState("");
  const [validated, setValidated] = useState(false);
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [createNewPage, setCreateNewPage] = useState(false);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      setValidated(false);
      sendToNotionHandler();
    }
  };

  const sendToNotionHandler = () => {
    if (
      sendSnippetsToNotion(snippets, title, selectedFolder.id, createNewPage)
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

  const handleCreateNewPageChange = () => {
    setCreateNewPage(!createNewPage);
    return true;
  };

  return (
    <>
      <Container>
        <Accordion className="m-2">
          <Accordion.Item eventKey="0">
            <Accordion.Body>
              <p> Put stuff here</p>
            </Accordion.Body>
            <Accordion.Header> Configure your Clips </Accordion.Header>
          </Accordion.Item>
        </Accordion>

        {snippets &&
          snippets.length > 0 &&
          snippets.map((snip, index) => {
            return index === 0 ? (
              <div className="m-2 mt-3 mb-2 ml-2 mr-2" key={index}>
                <Snippet text={snip} />
              </div>
            ) : (
              <div className="m-2" key={index}>
                <Snippet text={snip} />
              </div>
            );
          })}
      </Container>
    </>
  );
};

export default Main;
