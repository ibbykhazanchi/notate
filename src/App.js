import { useState, useEffect } from "react";
import { Login, Main, Account } from "./pages";
import { GlobalStyle } from "./styles";
import { Sidebar } from "./components";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { getUser } from "./server/server";

const App = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [botId, setBotId] = useState(null);

  const handleUserChange = (accessToken, botId) => {
    setAccessToken(accessToken);
    setBotId(botId);
  };

  // gets the URL
  useEffect(() => {
    // try to load the user
    chrome.storage.local.get(["botId"]).then((result) => {
      async function loadUser() {
        if (!result.botId) return;
        const user = await getUser(result.botId);

        const { accessToken, _id } = user;
        setAccessToken(accessToken);
        setBotId(_id);

        chrome.storage.session.set({ accessToken: accessToken });
        chrome.storage.local.set({ botId: _id });
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
                propAccessToken={accessToken}
                propBotId={botId}
                handleUserChange={handleUserChange}
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
