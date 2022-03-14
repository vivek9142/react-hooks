// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

//data fetch + ex cr -1 error sending 
import * as React from 'react'

import {PokemonForm,fetchPokemon,PokemonInfoFallback,PokemonDataView} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [pokemon,setPokemon] = React.useState(null);
  //for error boundary
  const [error,setError] = React.useState(null);
  React.useEffect(()=>{
    
    if(!pokemonName) {return;}
    //if searchbox is empty so the container will return loading status 
    setPokemon(null);

    fetchPokemon(pokemonName).then(
      pokemonData =>setPokemon(pokemonData),
      error => setError(error)
    )
  },[pokemonName]);

  if(error) {
    return (
      <div role='alert'>
        There was an error:{' '}
        <pre style={{whiteSpace:'normal'}}>
          {error.message}
        </pre>
      </div>
    )
  }
  if(!pokemonName){
    return 'Submit a pokemon';
  } else if (!pokemon){
    return <PokemonInfoFallback name={pokemonName} />;
  } else {
    return <PokemonDataView pokemon={pokemon} />
  }
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
