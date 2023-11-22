import { useState } from "react";
import { Login, Main } from './pages'
import { GlobalStyle } from "./styles";
import { Sidebar } from "./components"
import { MemoryRouter as Router, Routes, Route} from "react-router-dom"


const App = () => {

  const [token, setToken] = useState(true)

  return (
    <>
      <GlobalStyle />
      
      {!token ? (
        <Login />
      ) : (
        <> 
        <Router>
          <Sidebar />
          <Routes>
            <Route path='/' element={<></>} />
            <Route index element={<Main />} />
          </Routes>
        </Router>
        </>
      )}
    </>
  )
}

export default App;
