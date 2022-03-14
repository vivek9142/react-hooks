// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

function Name() {
  //ex-3 extra credit - moved the state back to Name comp since it is the only comp
  //needing the state changes so colocating state to the Name component
  const [name, setName] = React.useState('')
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={(event) => setName(event.target.value)} />
    </div>
  )
}

// 🐨 accept `animal` and `onAnimalChange` props to this component
function FavoriteAnimal({animal,onAnimalChange}) {
  // 💣 delete this, it's now managed by the App
  // const [animal, setAnimal] = React.useState('')
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input
        id="animal"
        value={animal}
        // onChange={//event => setAnimal(event.target.value)
        onChange = {onAnimalChange}
      />
    </div>
  )
}

//(1) -Exercise 🐨 uncomment this
// function Display({name, animal}) {
//   return <div>{`Hey ${name}, your favorite animal is: ${animal}!`}</div>
// }

// 💣 remove this component in favor of the new one
// function Display({name}) {
//   return <div>{`Hey ${name}, you are great!`}</div>
// }

//(2) -Exercise - here we r no longer accepting the name prop -so its working
function Display({animal}) {
  return <div>{`Your favorite animal is: ${animal}!`}</div>
}

//(1) - in this we are moving all the state management to the App 
//and passing the values n their change methods as a prop to sub components. 
//so this is called lifting state up.
function App() {
  // 🐨 add a useState for the animal
  //EX-2 extra-credit  - moving it to Name comp 
  // const [name, setName] = React.useState('')
  const [animal, setAnimal] = React.useState('')
  return (
    <form>
      {/*Exercise-2 - Extra credit -  name component only using the name n setname values so we should move it to its component.
      by this the name component will re-render when changed not the app comp so enhancing performance.
      this is called colocating state.
      */}
      {/* <Name name={name} onNameChange={event => setName(event.target.value)} /> */}
      <Name/>
      {/* 🐨 pass the animal and onAnimalChange prop here (similar to the Name component above) */}
      <FavoriteAnimal animal={animal} onAnimalChange={event => setAnimal(event.target.value)} />
      {/* 🐨 pass the animal prop here */}
      {/* 1- Exercise - passing both name n animal */}
      {/* <Display name={name} animal={animal}/> */}

      {/* 2- Exercise - passing animal */}
      <Display animal={animal}/>
    </form>
  )
}

export default App
