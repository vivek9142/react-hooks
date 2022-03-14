// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

/*1-remounting the error comp 
when error is encountered the error state rerender
with error state n now if you search for another pokemon it will rerender same error

1st way is by using key prop.this is not somthing you use a lot but you do
run into this occasionally where you want to reset the state of a particular component

its a nice trick to have up your sleeve.
*/

/*2 - importing new external lib for error-boundary- it can handle error 
boundary seamlessly.
*/
import * as React from 'react'
//importing error boundary lib
import { ErrorBoundary } from 'react-error-boundary';
import {PokemonForm,fetchPokemon,PokemonInfoFallback,PokemonDataView} from '../pokemon'

// 1- included in key prop soln

//2-excluded since already handled by react-errorboundary

// class ErrorBoundary extends React.Component{
//   state={error:null};   
//   static getDerievedStateFromError(error){
//     return {error};
//   }
//   render(){
//     const {error} = this.state;
//     if(error) {
//       return <this.props.FallbackComponent error={error}/>
//     }
//     console.log('Error Boundary',this.state.error);
//     return this.props.children;
//   }
// }

function PokemonInfo({pokemonName}) {
    const [state,setState] = React.useState({
      /*this will resolve the issue of 'submit a pokmon'  
      it is initializing considering fact that pokemonname is passed. this soln
      is temporary,core-prob exist,we're completely unmounting pokemoninfo comp
      n remounting it each time we change pokemon name.

      so soln is react-error boundary lib has resetErrorBoundary 
      */
        status:pokemonName ? 'pending':'idle',
        pokemon:null,
        error:null
    });

    const {status,pokemon,error} = state;

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
  function handleReset(){
    setPokemonName('');
  }
  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit = {handleSubmit} />
      <hr />
      {/* key prop soln - here when the pokemon name changes we can reset 
      the error boundary using key prop .everytime we change n submit new name
      we're going to unmount n remount the error boundary.*/}

      {/* 3-this come up with inconsistency.whenever the key of err boundary changes
      the error boundary unmounts n then pokemon info unmounts n the comp rerenders 
      so when pokemoninfo comp mounts it reset the state n shows status as idle.so it
      renders 'submit a pokemon ' within fraction of sec the data loads up with help
      of withEffect

      3- so we need to reset the error boundary
      */}
      {/* <ErrorBoundary key={pokemonName} FallbackComponent={ErrorFallback}> */}

      {/* 4- restore the pokemon click show functionality.  whenever the predefined 
      pokemon in UI is clicked it will not rerender but shows the error so we need to fix that
      we  need to reset the error state n alowed us to render the desired pokmemon.

      so react err boundary come up with resetKeys. this take array of fields which
      whenever changes the comp will reset the error state.
      */}
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleReset} resetKeys={[pokemonName]}>
        <div className="pokemon-info">
          <PokemonInfo pokemonName={pokemonName} />
        </div>
      </ErrorBoundary>
    </div>
  )
}

/* 3- so we can explicitly reset the state without having to unmount n 
remount */
function ErrorFallback({error,resetErrorBoundary}){
  return (
    <div role='alert'>
    There was an error:{' '}
    <pre style={{whiteSpace:'normal'}}>
      {error.message}
    </pre>
    <button onClick={resetErrorBoundary}></button>
    </div>
  )
}
export default App
