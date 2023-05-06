import './App.css';
import { Component } from "react";
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesComponent from './components/Particles/ParticlesComponent';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

const makeClarifaiRequest = (imageURL) => {
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = '66b6f695050f49948b7075fc7dc27c67';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'valesalh';       
    const APP_ID = 'facerecognitionapp';
    // Change these to whatever model and image URL you want to use
    // const MODEL_ID = 'face-detection';
    // const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
    const IMAGE_URL = imageURL;

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
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

    return requestOptions;
}

class App extends Component {

    constructor() {
        super();
        this.state = {
            input: "",
            imageURL: "",
            box: {},
            route: "signin",
            isSignedIn: false,

        }
    }

    componentDidMount() {
        fetch('http://localhost:3000')
            .then(response => response.json())
            .then(console.log);
    }

    calcFaceBox = (response) => {
        const clarifaiFace = response.outputs[0].data.regions[0].region_info.bounding_box;
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

    displayFaceBox = (box) => {
        this.setState({box});
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }

    onSubmit = () => {
        this.setState({imageURL: this.state.input});
        fetch("https://api.clarifai.com/v2/models/face-detection/outputs", makeClarifaiRequest(this.state.input))
        .then(response => response.json())
        .then(jsonData => this.displayFaceBox(this.calcFaceBox(jsonData)))
        .catch(err => console.log(err));
    }

    onRouteChange = (route) => {
        if(route === 'signin') {
            this.setState({isSignedIn: false});
        } else if(route === 'home') {
            this.setState({isSignedIn: true});
        }
        this.setState({route});
    }

    determineView = () => {
        const { imageURL, route, box } = this.state;
        if(this.state.route === 'home') {
            return (
                <div>
                <Logo />
                <Rank />
                <ImageLinkForm 
                    onInputChange={this.onInputChange}
                    onButtonSubmit={this.onSubmit}
                />
                <FaceRecognition 
                    box = {box}
                    imageURL={imageURL}
                />
                </div> 
            );
        } 
        else {
            return (
                route === 'signin'
                ? <Signin onRouteChange={this.onRouteChange} />
                : <Register onRouteChange={this.onRouteChange} />
            );
        }
    }

    render() {
        //const { isSignedIn, imageURL, route, box} = this.state;
        return (
            <div className="App">
                <ParticlesComponent />
                <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
                {
                    this.determineView()
                }
            </div>
        );
    }
}

export default App;
