import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import { useState } from 'react';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

const initialUserState = {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    };

function App() {
    const [input, updateInput] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [boxes, setBoxes] = useState([]);
    const [aspectRatio, setAspectRatio] = useState(1);
    const [route, setRoute] = useState('signin');
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [user, setUser] = useState({
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    });
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

    const calculateFaceLocation = ({ left_col, top_row, right_col, bottom_row }) => {
        const image = document.getElementById("img");
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: left_col * width,
            topRow: top_row * height,
            rightCol: right_col * width,
            bottomRow: bottom_row * height
        };
    }

    const onSubmit = (event) => {
        getAspectRatio(input)
            .then(aspectRatio => {
                setAspectRatio(aspectRatio);
                setImageURL(input);

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
                                }
                            }
                        }
                    ]
                });

                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Key ' + PAT
                    },
                    body: raw
                };

                fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/outputs`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        if (result) {
                            fetch('http://localhost:4000/image', {
                                method: 'put',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    id: user.id
                                })
                            })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Network response was not ok');
                                }
                                return response.json();
                            })
                            .then(entries => {
                                // Update user entries here
                                setUser(oldState => ({ ...oldState, entries: entries.count }));
                            })
                            .catch(err => console.log('Error updating entries:', err));

                        }

                        const regions = result.outputs[0].data.regions;
                        const newBoxes = regions.map(region => {
                            const boundingBox = region.region_info.bounding_box;
                            return calculateFaceLocation({
                                left_col: boundingBox.left_col,
                                top_row: boundingBox.top_row,
                                right_col: boundingBox.right_col,
                                bottom_row: boundingBox.bottom_row
                            });
                        });
                        setBoxes(newBoxes);
                    })
                    .catch(error => console.log('error', error));
            })
            .catch(error => {
                console.error('Error loading image:', error);
            });
    }

    const onRouteChange = (route) => {
        if (route === 'signout') {
            signOut();
        } else if (route === 'home') {
            setIsSignedIn(true);
        }
        setRoute(route);
    }

    const loadUser = (data) => {
        setUser({
            id: data.id,
            name: data.name,
            email: data.email,
            entries: data.entries,
            joined: data.joined
        });
    }

    const signOut = () => {
        setIsSignedIn(false);
        setBoxes([]);
        setImageURL('');
        setAspectRatio(1);
        setUser(initialUserState);
    }

    return (
        <div className="App">
            <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange}/>
            { route === 'home' 
              ? <div>
                  <Logo />
                  <ImageLinkForm onChange={onInputChange} onSubmit={onSubmit} />
                  <FaceRecognition boxes={boxes} imageURL={imageURL} aspectRatio={aspectRatio} />
                  <Rank name={user.name} entries={user.entries}/>
                </div>
                
              : ( (route === 'signin' || route === 'signout')
                  ? <SignIn onRouteChange={onRouteChange} loadUser={loadUser}/> 
                  : <Register onRouteChange={onRouteChange} loadUser={loadUser}/>)      
            }
        </div>
    );
}

export default App;
