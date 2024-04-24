import { useEffect, useState } from 'react'
import './App.css'
import Homepage from './components/Homepage/Homepage'

function App() {
  const sessionAuthorize = sessionStorage.getItem('authorized')
  const [authorized, setAuthorization] = useState(sessionStorage.getItem('authorized') ? true : '')

  console.log(sessionStorage.getItem('authorized'));

  useEffect(() => {
    sessionStorage.setItem('authorized', authorized)
  }, [authorized])

  return (
    <>   
        <Homepage authorized={authorized} setAuthorization={setAuthorization}/>
    </>
  )
}

export default App