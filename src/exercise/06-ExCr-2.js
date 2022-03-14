// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

//error boundary 
import * as React from 'react'

import {PokemonForm,fetchPokemon,PokemonInfoFallback,PokemonDataView} from '../pokemon'

//1- creating error boundary
class ErrorBoundary extends React.Component{
  state={error:null};   
  static getDerievedStateFromError(error){
    return {error};
  }
  render(){
    const {error} = this.state;
    if(error) {
      /* 3-c adding the fallback comp n adding the error here.
      so with this we can make a more generic errorboundary n anyone can
      use this error boundary with any error or any location in renders,he want 
      */
      return <this.props.FallbackComponent error={error}/>
    }
    console.log('Error Boundary',this.state.error);
    return this.props.children;
  }
}

function PokemonInfo({pokemonName}) {
    const [state,setState] = React.useState({
        status:'idle',
        pokemon:null,
        error:null
    });

    const {status,pokemon,error} = state;

//3- update the states
React.useEffect(()=>{
    
    if(!pokemonName) {return;}
    setState({status:'pending'});

    fetchPokemon(pokemonName).then(
      pokemon =>{setState({pokemon,status:'resolved'});},
      error => {setState({error,status:'rejected'});}
    )
  },[pokemonName]);

if(status==='idle'){
    return 'Submit a pokemon';
  } else if(status==='pending'){
    return <PokemonInfoFallback name={pokemonName} />;
  } if(status==='rejected'){
    //this will be handled by our error boundary.
    throw error;
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
/*2-The context or place where put the error boundary matters. this is becasue if you put it across
all components it will crash the render instead you put it in certain comp it will show 
error in place of that comp

3-creating the fallback component for the error
*/ 
  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      {/* wrapping the error boundary comp 
      3- b-embeding the fallbakcomp */}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div className="pokemon-info">
          <PokemonInfo pokemonName={pokemonName} />
        </div>
      </ErrorBoundary>
    </div>
  )
}
//3-a - creating the fallback component for the error
function ErrorFallback({error}){
  return (
    <div role='alert'>
    There was an error:{' '}
    <pre style={{whiteSpace:'normal'}}>
      {error.message}
    </pre>
    </div>
  )
}
export default App
