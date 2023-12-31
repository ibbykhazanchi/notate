import { useState, useEffect } from "react";
import { Main, Account } from "./pages";
import { GlobalStyle } from "./styles";
import { Sidebar } from "./components";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { getUser } from "./server/server";
import { CHROME_STORAGE_BOT_ID_KEY, CHROME_STORAGE_ACCESS_TOKEN_KEY } from "./model";

const App = () => {
  const [botId, setBotId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const emitUserChange = (botId, accessToken) => {
    setBotId(botId);
    setAccessToken(accessToken);
  };

  // gets the URL
  useEffect(() => {
    // try to load the user
    chrome.storage.local.get([CHROME_STORAGE_BOT_ID_KEY]).then((result) => {
      async function loadUser() {
        if (!result.botId) return;
        const user = await getUser(result.botId);
        if(!user) return;

        const { _id, accessToken } = user;
        setBotId(_id);
        setAccessToken(accessToken);

        chrome.storage.local.set({[CHROME_STORAGE_BOT_ID_KEY]: _id });
        chrome.storage.session.set({[CHROME_STORAGE_ACCESS_TOKEN_KEY]: accessToken });
      }
      loadUser();
    });
  }, []);

  return (
    <>
      <GlobalStyle />
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<></>} />
          <Route
            path="account"
            element={
              <Account
                propBotId={botId}
                propAccessToken={accessToken}
                emitUserChange={emitUserChange}
              />
            }
          />
          <Route index element={<Main propAccessToken={accessToken} />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
