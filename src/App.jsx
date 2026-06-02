import { useState } from 'react'
import './App.css'
import HomeLayout from './Components/layout/HomeLayout'

function App() {
  const [count, setCount] = useState(0)

  return (
 <>
 <HomeLayout></HomeLayout>
 </>
  )
}

export default App
