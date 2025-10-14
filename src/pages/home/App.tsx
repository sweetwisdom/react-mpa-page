import { useState } from 'react'
import './App.css'

const App = () => {
  const [count, setCount] = useState(0)
  function add() {
    setCount(c => c + 1)
  }
  function reduce() {
    setCount(c => c - 1)
  }
  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
      <p>count is {count}</p>
      <p>multi page <a href="./demo">to demo</a></p>
      <div >
        <button onClick={add} style={{margin:'10px 20px'}}>add</button>
        <button onClick={reduce}>reduce</button>
      </div>
    </div>
  )
}

export default App
