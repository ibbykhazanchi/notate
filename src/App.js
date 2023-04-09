import { useState } from "react";
import { Login, Main } from './pages'

const App = () => {

  const [token, setToken] = useState(true)

  return (
    <>
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
