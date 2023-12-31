import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { getAccessToken } from '../Notion'
const Account = ({propAccessToken, propBotId, handleUserChange}) => {

  const [accessToken, setAccessToken] = useState(propAccessToken)
  const [botId, setBotId] = useState(propBotId)

  const authenticate = () => {
    chrome.identity.launchWebAuthFlow({
      url: process.env.REACT_APP_AUTHORIZATION_URL,
      interactive: true,
    }, async (responseUrl) => {
      const url = new URL(responseUrl)
      const urlParams = new URLSearchParams(url.searchParams)
      const code = urlParams.get("code");
      const {bot_id, access_token} = await getAccessToken(code)

      setBotId(bot_id)
      setAccessToken(access_token)

      handleUserChange(access_token, bot_id)
    });
  }

  const signOut = () => {
    chrome.storage.session.remove("accessToken")
    chrome.storage.local.remove("botId")

    setAccessToken(null)
    setBotId(null)

    handleUserChange(null, null)
  }

  const clearData = () => {
    chrome.storage.session.clear()
    chrome.storage.local.clear()
  }

  return (
    <>
    {!accessToken ? (
      <Button onClick={authenticate}> 
        Sign into Notion
      </Button>
    ): (
      <>
        <h1> You are signed in! </h1>
        <Button onClick={signOut}>
          Sign out of your Snip.It Account
        </Button>
      </>
    )}
    <Button onClick={clearData}> Clear All Snip.it Data </Button>
    </>
  )
}

export default Account