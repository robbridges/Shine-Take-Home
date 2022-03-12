import React from 'react';
import './App.css';
import ImageGallery from './Components/ImageGallery';
import Header from './Components/Header';



const App  =() => {
  
  return (
    <div className="App">
      <Header />
      <ImageGallery  />
      
      
    </div>
  );
}

export default App;
