import React from 'react'
import { Button } from 'react-bootstrap'

const Account = () => {
  const authenticate = () => {
    console.log(chrome.identity.getRedirectURL())
    chrome.identity.launchWebAuthFlow({
      url: "https://api.notion.com/v1/oauth/authorize?client_id=abb05544-9ed0-4b7c-a68b-12133988c801&response_type=code&owner=user&redirect_uri=https%3A%2F%2Fkalkkpcdhhpekdlinpjapchgbnpoccig.chromiumapp.org%2F",
      interactive: true,
    }, (responseUrl) => {
      console.log(responseUrl)
    });
  }
  return (
    <Button onClick={authenticate}> 
      Sign into Notion
    </Button>
  )
}

export default Account