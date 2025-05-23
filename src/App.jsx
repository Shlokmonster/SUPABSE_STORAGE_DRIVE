import { useState } from 'react'
import AuthForm from './Authform'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <AuthForm />
    </>
  )
}

export default App
