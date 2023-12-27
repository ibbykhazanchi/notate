import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { getAccessToken } from '../Notion'
const Account = () => {

  const [accessToken, setAccessToken] = useState(null)

  useEffect(() => {
    chrome.storage.session.get(["accessToken"]).then((result) => {
      setAccessToken(result.accessToken)
    })
  }, [])

  const authenticate = () => {
    chrome.identity.launchWebAuthFlow({
      url: process.env.REACT_APP_AUTHORIZATION_URL,
      interactive: true,
    }, async (responseUrl) => {
      const url = new URL(responseUrl)
      const urlParams = new URLSearchParams(url.searchParams)
      const code = urlParams.get("code");
      const _accessToken = await getAccessToken(code)
      setAccessToken(_accessToken)
    });
  }
  return (
    <>
    {!accessToken ? (
      <Button onClick={authenticate}> 
        Sign into Notion
      </Button>
    ): (
      <h1> You are signed in! </h1>
    )}
    </>
  )
}

export default Account