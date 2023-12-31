import { useState, useEffect } from "react";
import { Login, Main, Account } from "./pages";
import { GlobalStyle } from "./styles";
import { Sidebar } from "./components";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { getUser } from "./server/server";

const App = () => {
  const [accessToken, setAccessToken] = useState(true);

  // gets the URL
  useEffect(() => {
    // try to load the user
    chrome.storage.local.get(["botId"]).then((result) => {
      async function loadUser(){
        if (!result.botId) return;
        const { _, accessToken } = await getUser(result.botId);
        setAccessToken(accessToken);
        chrome.storage.session.set({ accessToken: accessToken });
      }
      loadUser()
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
            element={<Account accessToken={accessToken} />}
          />
          <Route index element={<Main propAccessToken={accessToken} />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
