import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <div className='text-3xl font-bold underline text-amber-700'>
          <p>Hello World</p>
        </div>
    </>
  )
}

export default App
