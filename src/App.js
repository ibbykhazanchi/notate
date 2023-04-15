import { useState } from "react";
import { Login, Main } from './pages'
import { GlobalStyle } from "./styles";

const App = () => {

  const [token, setToken] = useState(true)

  return (
    <>
      <GlobalStyle />
      
      {!token ? (
        <Login />
      ) : (
        <> 
          <Main />
        </>
      )}
    </>
  )
}

export default App;
