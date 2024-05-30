import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import { useState, useRef } from 'react';

function App() {
  const [input, updateInput] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [boxes, setBoxes] = useState([]);
  const [aspectRatio, setAspectRatio] = useState(1);
  const canvasRef = useRef(null);
  const PAT = 'e4709956eb984194878fcd63cd8adbca';
  const USER_ID = 'mhlowry';
  const APP_ID = 'ai-face-detect';
  const MODEL_ID = 'face-detection';
    
  async function getAspectRatio(imageUrl) {
      return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = imageUrl;

          img.onload = () => {
              const aspectRatio = img.width / img.height;
              resolve(aspectRatio);
          };

          img.onerror = (error) => {
              reject(error);
          };
      });
  }

  const onInputChange = (event) => {
     updateInput(event.target.value);
  }

  const onSubmit = ( event ) => {
    getAspectRatio(input)
          .then(aspectRatio => {
            setAspectRatio(aspectRatio)
            setImageURL(input);

            // Create a JSON to send to the API
            const raw = JSON.stringify({
              "user_app_id": {
                  "user_id": USER_ID,
                  "app_id": APP_ID
              },
              "inputs": [
                  {
                      "data": {
                          "image": {
                              "url": input
                              // "base64": IMAGE_BYTES_STRING
                          }
                      }
                  }
              ]
            });

            // Send request options to the API
            const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Key ' + PAT
            },
            body: raw
            };


            fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
              .then(response => response.json())
              .then(result => {

                  const regions = result.outputs[0].data.regions;

                  regions.forEach(region => {
                      // Accessing and rounding the bounding box values
                      const boundingBox = region.region_info.bounding_box;
                      const topRow = boundingBox.top_row.toFixed(3);
                      const leftCol = boundingBox.left_col.toFixed(3);
                      const bottomRow = boundingBox.bottom_row.toFixed(3);
                      const rightCol = boundingBox.right_col.toFixed(3);

                      region.data.concepts.forEach(concept => {
                          // Accessing and rounding the concept value
                          const name = concept.name;
                          const value = concept.value.toFixed(4);

                          console.log(`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);
                          
                      });
                  });
              })
              .catch(error => console.log('error', error));

                  })
                  .catch(error => {
                    console.error('Error loading image:', error)
                  });            
  }

  return (
    <div className="App">
      <Navigation />
      <Logo />
      <ImageLinkForm onChange={onInputChange} onSubmit={onSubmit}/>
      <FaceRecognition imageURL={imageURL} aspectRatio={aspectRatio}/>
      <Rank />
      
    </div>
  );
}

export default App;
