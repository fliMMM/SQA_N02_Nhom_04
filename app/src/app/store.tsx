import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../slices/counterSlice';

const rootReducer = {
  counter: counterReducer  
}


const store = configureStore({
  reducer: rootReducer,
});

export default store;