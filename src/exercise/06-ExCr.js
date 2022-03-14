// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

//data fetch + ex cr -1 error sending 
import * as React from 'react'

import {PokemonForm,fetchPokemon,PokemonInfoFallback,PokemonDataView} from '../pokemon'

function PokemonInfo({pokemonName}) {
//   const [status,setStatus] = React.useState('idle');
//   const [pokemon,setPokemon] = React.useState(null);
//   //for error
//   const [error,setError] = React.useState(null);

//3- setting combined state for above three states 
    const [state,setState] = React.useState({
        status:'idle',
        pokemon:null,
        error:null
    });

    const {status,pokemon,error} = state;

//   React.useEffect(()=>{
    
//     if(!pokemonName) {return;}
//      //2-here we're getting error when we r typing the name which is set in backend.
//     //it is due to the error set which will return the error till it is set to null
//     setStatus('pending');
//     setPokemon(null);
//     setError(null);
//     fetchPokemon(pokemonName).then(
//       pokemonData =>{setPokemon(pokemonData);setStatus('resolved');},
//       error => {setError(error);setStatus('rejected');}
//     )
//   },[pokemonName]);

    /*3- if we set the status before the setting the data. we will get the error
//so we are making one combined state for all 3 comp.*/

//3- update the states
React.useEffect(()=>{
    
    if(!pokemonName) {return;}
    setState({status:'pending'});

    fetchPokemon(pokemonName).then(
      pokemon =>{setState({pokemon,status:'resolved'});},
      error => {setState({error,status:'rejected'});}
    )
  },[pokemonName]);

//1-previous setup

//   if(error) {
//     return (
//       <div role='alert'>
//         There was an error:{' '}
//         <pre style={{whiteSpace:'normal'}}>
//           {error.message}
//         </pre>
//       </div>
//     )
//   }
//   if(!pokemonName){
//     return 'Submit a pokemon';
//   } else if (!pokemon){
//     return <PokemonInfoFallback name={pokemonName} />;
//   } else {
//     return <PokemonDataView pokemon={pokemon} />
//   }

//2- new setup includes setting up status for data fetch to print o/p 
//accordingly.
//   if(status==='idle'){
//     return 'Submit a pokemon';
//   } else if(status==='pending'){
//     return <PokemonInfoFallback name={pokemonName} />;
//   } if(status==='rejected'){
//     return (
//       <div role='alert'>
//         There was an error:{' '}
//         <pre style={{whiteSpace:'normal'}}>
//           {error.message}
//         </pre>
//       </div>
//     )
//   } if(status==='resolved'){
//     return <PokemonDataView pokemon={pokemon} />
//   } 
//     throw new Error('this should be impossible');

// 3- if we set the status before the setting the data. we will get the error
//so we are making one combined state for all 3 comp.

if(status==='idle'){
    return 'Submit a pokemon';
  } else if(status==='pending'){
    return <PokemonInfoFallback name={pokemonName} />;
  } if(status==='rejected'){
    return (
      <div role='alert'>
        There was an error:{' '}
        <pre style={{whiteSpace:'normal'}}>
          {error.message}
        </pre>
      </div>
    )
  } if(status==='resolved'){
    return <PokemonDataView pokemon={pokemon} />
  } 
    throw new Error('this should be impossible');

}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
