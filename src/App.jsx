import './App.css';
import React, { useState, useEffect, useReducer } from 'react';
import Wrapper from './components/Wrapper';
import NavBar from './components/NavBar';
import Films from './containrs/Films';
import People from './containrs/People';
import api from './services/api';

const initialState = {
  counter: 1,
  films: [],
  category: 'films',
  isLoading: true,
}

export const Context = React.createContext(null)

// (як набір інструментів) 
//що саме зрозити зі стейтом  розуміємо по параметру type, 
// тайпом ми потрапляємо  на потрібний кейс і повертаємо новий стейт
const reducer = (state, action) => {
  switch (action.type){
    case 'FILMS/SET':
      return {
        ...state,
        films: action.payload,
      }
    case 'FILMS/DELETE_BY_ID':
      return {
        ...state,
        films: state.films.filter(film => film.id !== action.payload),
      }
    case 'LOADING/SET':
      return {
        ...state,
        isLoading: action.payload,
      }
    case 'CATEGORY/SET':
      return {
          ...state,
          category: action.payload,
      }
    // якщо не  потрапив ні на один з action (ні одного type не знайшов),
    // state ніяк  не змінювався - тому рендер не  потрібен
    default: 
      return state;
  }
}


const App = () => {
  const [state, dispatch] = useReducer(reducer,  initialState)
  //викликаємо useEffect один раз  на маунті, щоб взяти всі фільми з бекенду
  // коли отримає - виклече setList
  useEffect(() => {
    // виклик сервісу, взято getFilm, отримуємо  та записуємо у стейт setList
    api.getFilms()
    .then(films => dispatch({
      type: 'FILMS/SET',
      payload: films
    }))
    .finally(() => dispatch({
      type: 'LOADING/SET',
      payload: false, // все  завантажилось
    }));
  }, []);

  // передали назву категорії, а setState це замінив
  const handleChangeCategory = (category) =>
    dispatch({type: 'CATEGORY/SET', payload: category});


  return (
    <Context.Provider value={{state, dispatch}}>
    <Wrapper>
      <NavBar handleChangeCategory={handleChangeCategory}/>
      {state.category === 'films' && <Films/>} 
      {state.category === 'people' && <People/>}
    </Wrapper>
    </Context.Provider>
  )
}


export default App;
