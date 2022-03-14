/* eslint-disable react-hooks/rules-of-hooks */
// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

//06-creating the custom hook for this operation
function useLocalStorageState(
  key,
  //8- what if the default value provided is computationally expensive or passed as some func
  defaultValue='',{
    // 07-if we dont want to parse or stringify they can override we want to desiralize 
    // so we can pass options as extra params if they dont want to provide options we
    //we can default it to empty obj and destructure that,now we can replace parse n stringify with function
    //mapped to obj
  serialize= JSON.stringify,deserialize= JSON.parse}={}){
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state,setState] = React.useState(
    ()=>{
      const valueInLocalStorage = window.localStorage.getItem(key)
      if(valueInLocalStorage) return deserialize(valueInLocalStorage)
      //8-so here we'll add use case for default val as func n also as value
      return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
    });
    //9- implemented this will give me obj  that i can mutate without triggering re-renders that
    //differs from useState since if we want to change the value so we need to call setState func
    const prevKeyRef = React.useRef(key);

  React.useEffect(()=>{
    //9-
    const prevKey = prevKeyRef.current;
    if(prevKey !== key){
      window.localStorage.removeItem(key,serialize(prevKey));
    }
    prevKeyRef.current = key

    window.localStorage.setItem(key,serialize(state));
  },
  //9-what if key changes in between the renders n the name is saved as dunder or smething else 
  //so here remove the old value from prev key n store the new one
  [key, serialize, state]);

  return [state,setState];
}

function Greeting({initialName = ''}) {
  // 1-
  //but here the localstorage is saving '' since it will revert back without checking the
  //previous saved value
  // const [name, setName] = React.useState(initialName)

  // 2-
  //so here the state will take the pre-existing value if its not present it will take default value
  // const [name, setName] = React.useState(
  //   //this statemnt is expensive in performance since in every rerender it will get executed so we will
  //   //create a function contianing this statement 
  //   window.localStorage.getItem('name') || initialName
  // )

  // 3-
  // function getInitialNameValue(){
  //   return window.localStorage.getItem('name') || initialName
  // }
  //so this func will get value only when it needs it for the first time to get only intialvalue
  // const [name, setName] = React.useState(getInitialNameValue)

  // 4-refactoring the 3-code
  // const [name, setName] = React.useState(()=>window.localStorage.getItem('name') || initialName)

  // React.useEffect(()=>{
  //   //00-
  //   // on each re-render the localstorage will save the name but this will give performance issue,
  //   //so we need to have dependencies on which the comp will rerender if changed
  //   window.localStorage.setItem('name',name);
  // });

  // React.useEffect(()=>{
  //   //05-adding dependencies
  //   window.localStorage.setItem('name',name);
  // },[name]);

  //06-creating n calling the custom hook 
  const [name, setName] = useLocalStorageState('name',initialName);
  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
