import './App.css';
import React, { useState, useEffect } from 'react';
import Wrapper from './components/Wrapper';
import NavBar from './components/NavBar';
import Films from './containrs/Films';
import People from './containrs/People';

const App = () => {
  const [category, setCategory] = useState('films');

  // передали назву категорії, а setState це замінив
  const handleChangeCategory = (category) => setCategory(category);


  return (
    <Wrapper>
      <NavBar handleChangeCategory={handleChangeCategory}/>
      {category === 'films' && <Films/>} 
      {category === 'people' && <People/>}
    </Wrapper>
  )
}


export default App;
