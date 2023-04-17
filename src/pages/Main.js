import { useEffect, useState, useRef } from 'react'
import { sendSnippetsToNotion } from '../Notion';
import { StyledDropDown, Snippet } from '../components';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components/macro';
import InputGroup from 'react-bootstrap/InputGroup'



const Main = () => {

  const [url, setUrl] = useState("")
  const [snippets, setSnippets] = useState([])
  const [title, setTitle] = useState("")
  const [validated, setValidated] = useState(false);
  const [rootNotionFolder, setRootNotionFolder] = useState()

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    // i hate this but whatever lol
    const rf = document.getElementById("rf").value
    if(rf && rf !== ""){
      setRootNotionFolder(rf)
      //cache it
      chrome.storage.local.set({"rootNotionFolder" : rf})
    }

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      setValidated(false);
      sendToNotionHandler()
    }
  };


  // gets the URL
  useEffect(() => {
    const queryInfo = {active: true, lastFocusedWindow: true}

    chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
      if(tabs[0] && tabs[0].url){
        setUrl(tabs[0].url)
      }
    })

    chrome.storage.local.get("rootNotionFolder", (data) => {
      setRootNotionFolder(data.rootNotionFolder)
    })
  }, [])

  // when the URL changes, you need to reload snippets
  useEffect(() => {
    chrome.storage.local.get(url, (data) => {
      setSnippets(data[url])
    })
  }, [url])

  const handleChange = (event) => {
    setTitle(event.target.value)
  }

  const sendToNotionHandler = () => {
    if(sendSnippetsToNotion(snippets, title, rootNotionFolder)){

      // clear snippets
      setSnippets([])
      setTitle('') 

      // delete cached snippets
      chrome.storage.local.remove(url)
    }
  }

  return (
    <>
      
      <Container>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Col xs={7}>
            <Form.Control 
              type="text" 
              placeholder="Enter a Title"
              value={title}
              onChange={handleChange}
              className='mb-2 mt-3'
              required
            />
          </Col>
          <Col>
            <InputGroup>
              <StyledDropDown rootNotionFolder={rootNotionFolder}/>            
            </InputGroup>
          </Col>
        </Row>
          <Row>
            <Col xs={7}>
              <Button type='submit'> Send to Notion </Button>
            </Col>
        </Row>
      </Form>
      
      {snippets && snippets.length > 0 && (
        snippets.map((snip, index) => {
          return (
            index === 0 ? (
              <div className='m-2 mt-3 mb-2 ml-2 mr-2' key={index}> 
                <Snippet text={snip} />
              </div>
            ) : (
              <div className='m-2' key={index}> 
                <Snippet text={snip} />
              </div>
            )
          );
  })
)}


      </Container>
    </>
  );
}

export default Main;
