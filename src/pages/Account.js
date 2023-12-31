import React, { useState } from 'react'
import { Button, Container} from 'react-bootstrap'
import { authenticateNotionUser } from '../Notion'
import { CHROME_STORAGE_BOT_ID_KEY, CHROME_STORAGE_ACCESS_TOKEN_KEY } from "../model";
import { addUser } from "../server/server";
import Profile from '../components/Profile';

const Account = ({propBotId, propAccessToken, propProfile, emitUserChange}) => {

  const [botId, setBotId] = useState(propBotId)
  const [accessToken, setAccessToken] = useState(propAccessToken)
  const [profile, setProfile] = useState(propProfile)

  const authenticate = () => {
    chrome.identity.launchWebAuthFlow({
      url: process.env.REACT_APP_AUTHORIZATION_URL,
      interactive: true,
    }, async (responseUrl) => {
      const url = new URL(responseUrl)
      const urlParams = new URLSearchParams(url.searchParams)
      const code = urlParams.get("code");
      const {bot_id, access_token, profile} = await authenticateNotionUser(code)

      setBotId(bot_id)
      setAccessToken(access_token)
      setProfile(profile)

      // save user in storage & db
      saveUser(bot_id, access_token, profile)

      // emit user change to parent
      emitUserChange(bot_id, access_token, profile)
    });
  }

  const saveUser = (bot_id, access_token, profile) => {
    chrome.storage.local.set({[CHROME_STORAGE_BOT_ID_KEY]: bot_id})
    chrome.storage.session.set({[CHROME_STORAGE_ACCESS_TOKEN_KEY]: access_token})
  
    addUser(bot_id, access_token, profile)
  }

  const signOut = () => {
    chrome.storage.session.clear()
    chrome.storage.local.clear()
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
    setProfile(null)

    emitUserChange(null, null)
  }

  return (
    <>
    <Container className="text-center">
      <Profile profile={profile}/>
      {(!accessToken && !botId && !profile) ? (
        <Button onClick={authenticate}> 
          Sign into Notion
        </Button>
      ): (
        <>
          <Button onClick={signOut}>
            Sign out
          </Button>
        </>
      )}
      <div className='fixed-bottom text-center mb-3' style={{zIndex:2}}>
        <Button onClick={clearData}> Clear All Snip.it Data </Button>
      </div>
    </Container>
    </>
  )
}

export default Account