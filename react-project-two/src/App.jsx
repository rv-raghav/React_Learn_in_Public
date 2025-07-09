import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserCard from './components/UserCard'
import download from "./assets/download.jpeg"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='container'>
      <UserCard name="Raghav Verma" desc = "desc1" image={download} style={{"border-radius":"5rem"}}/>
      <UserCard name="Atomic" desc = "desc2" image={download} style={{"border-radius":"5rem"}}/>
      <UserCard name="Reactttttt" desc = "desc3" image={download} style={{"border-radius":"5rem"}}/>

    </div>
  )
}

export default App
