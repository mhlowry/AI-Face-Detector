import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import { useState } from 'react';

function App() {
  const [input, updateInput] = useState('');

  const onInputChange = (event) => {
    console.log(event.target.value);
  }

  const onSubmit = () => {
    console.log('click');
  }

  return (
    <div className="App">
      <Navigation />
      <Logo />
      <ImageLinkForm onChange={onInputChange} onSubmit={onSubmit}/>
      {/* <FaceRecognition /> */}
      <Rank />
      
    </div>
  );
}

export default App;
