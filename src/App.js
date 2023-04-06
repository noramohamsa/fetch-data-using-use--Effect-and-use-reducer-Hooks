// import logo from './logo.svg';
import { useEffect, useReducer } from 'react';
import './App.css';
import axios from 'axios';

const intialState = {
  loading: true,
  error: "",
  post: {}
}

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH-SUCCESS":
      return {
        loading: false,
        error: "",
        post: action.payload

      }

    case "FETCH-FAILED":
      return {
        loading: false,
        error: "SOME THING WENT WRONG",
        post: {}

      }
    default:
      return state

  }
}


function App() {
  const [state, dispatch] = useReducer(reducer, intialState)

  useEffect(()=>{
    axios.get('https://jsonplaceholder.typicode.com/posts/1').then((response )=> {
    dispatch({type:'FETCH-SUCCESS',payload:response.data});
    }).catch((error)=>{
      dispatch({type:'FETCH-FAILED'})
    })


    
  },[])
  return (
    <div className="App">
     {state.loading ? "loading..." : state.post.title}
     {state.error && state.error}
    </div>
  );
}

export default App;
