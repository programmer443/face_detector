import { Component } from 'react';
import Clarifai from 'clarifai';
import { Particles } from 'react-particles-js';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
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

const app = new Clarifai.App({
    apiKey: '5100362781d7465589e706f55da36479'
});



class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl: ''
        }
    }

    onInputChange = (event) => {
        this.setState({ input: event.target.value });
    }

    onButtonSubmit = () => {
        this.setState({
            imageUrl: this.state.input,
        })
        app.models.predict(
                Clarifai.FACE_DETECT_MODEL,
                this.state.input)
            .then(

                function(response) {
                    // do something with response
                    console.log("response", response)
                },
                function(err) {
                    // there was an error
                    console.log("error", err)
                }
            );
    }

    render() {
        return (
            <div className="App">
           <Particles className="particles"
                params={particlesOptions}
              />
            <Navigation />
            <Logo />
            <Rank />
            <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition imageUrl={this.state.imageUrl}/>
          </div>
        );
    }
}

export default App;