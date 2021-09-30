import { Component } from 'react';
import { Particles } from 'react-particles-js';

import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';


import './App.css';

const particlesOptions = {
    particles: {
        number: {
            value: 160,
            density: {
                enable: true,
                value_area: 800
            }
        },
    }
}

const initailState = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        join: ""
    }
}


class App extends Component {
    constructor() {
        super();
        this.state = initailState
    }

    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                join: data.join
            }
        })
    }

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)

        }
    }

    displayBox = (box) => {
        this.setState({ box: box });
    }

    onInputChange = (event) => {
        this.setState({ input: event.target.value });
    }

    onButtonSubmit = () => {
        this.setState({ imageUrl: this.state.input });
        fetch('http://localhost:3035/imageurl', {
                method: 'post',
                headers: { 'content-Type': 'application/json' },
                body: JSON.stringify({
                    input: this.state.input
                })
            })
            .then(response => response.json())
            .then(response => {
                if (response) {
                    fetch('http://localhost:3035/image', {
                            method: 'put',
                            headers: { 'content-Type': 'application/json' },
                            body: JSON.stringify({
                                id: this.state.user.id
                            })
                        })
                        .then(response => response.json())
                        .then(data => {
                            this.setState(Object.assign(this.state.user, { entries: data }))
                        })
                        .catch(err => {
                            console.log('Error')
                        })
                }
                this.displayBox(this.calculateFaceLocation(response))
            })
            .catch(err => console.log("Error: ", err));
    }


    onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState(initailState)
        } else if (route === 'home') {
            this.setState({ isSignedIn: true })
        }
        this.setState({ route: route });
    }

    render() {
        const { route, isSignedIn, imageUrl, box, user } = this.state;
        return (
            <div className="App">
           <Particles className="particles"
                params={particlesOptions}
              />
            <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
            { route === 'home' 
              ? <div>
                    <Logo />
                    <Rank name={user.name} entries={user.entries}/>
                    <ImageLinkForm 
                    onInputChange={this.onInputChange} 
                    onButtonSubmit={this.onButtonSubmit}
                    />
                    <FaceRecognition box={box} imageUrl={imageUrl}/>
                </div>
              : (
                route === 'signin' 
                ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
                : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
                )
               
                
            }
          </div>
        );
    }
}

export default App;