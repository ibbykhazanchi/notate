import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { getAccessToken } from '../Notion'
import { CHROME_STORAGE_BOT_ID_KEY, CHROME_STORAGE_ACCESS_TOKEN_KEY } from "../model";

const Account = ({propBotId, propAccessToken, emitUserChange}) => {

  const [botId, setBotId] = useState(propBotId)
  const [accessToken, setAccessToken] = useState(propAccessToken)

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

      emitUserChange(bot_id, access_token)
    });
  }

  const signOut = () => {
    chrome.storage.local.remove([CHROME_STORAGE_BOT_ID_KEY])
    chrome.storage.session.remove([CHROME_STORAGE_ACCESS_TOKEN_KEY])

    wipeState()
  }

  const clearData = () => {
    chrome.storage.session.clear()
    chrome.storage.local.clear()

    wipeState()
  }

  const wipeState = () => {
    setAccessToken(null)
    setBotId(null)

    emitUserChange(null, null)
  }

  return (
    <>
    {(!accessToken && !botId) ? (
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