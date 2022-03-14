// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

function Greeting({initialName=''}) {
  // 💣 delete this variable declaration and replace it with a React.useState call
  const [name,setName] = React.useState(initialName);

  function handleChange(event) {
    setName(event.target.value)
    // 🐨 update the name here based on event.target.value
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        {/* Controlled comp is input. since it is controlled by whatever the state value is*/}
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  /*
  One thing to keep in mind here is if we dont pass the prop from comp to the controlled components when it needs.
  it will throw an error "a comp is changing an uncontrolled input of type undefined to be controlled" 
  so we can pass initialName default value as '' so it will work irrespective of it in comp definatio */
  return <Greeting initialName='George' />
}

export default App
