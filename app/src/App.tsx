import { useState } from 'react'
import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { incre } from './slices/counterSlice';

interface RootState {
  counter: number;
};

function App() {

  const counter = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();
  
  const handleAdd = () => {
    dispatch(incre());
  }

  return (
    <div className="App">
      <button onClick={handleAdd}>add</button>

      <h1>{ counter}</h1>
    </div>
  )
}

export default App
