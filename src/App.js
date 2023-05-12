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

const initialState = {
    input: "",
    imageURL: "",
    box: {},
    route: "signin",
    isSignedIn: false,
    user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
    }
}

class App extends Component {

    constructor() {
        super();
        this.state = initialState;
    }

    loadUser = (data) => {
        this.setState({ user: {
            id: data.id,
            name: data.name,
            email: data.email,
            entries: data.entries,
            joined: data.joined
        }});
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

    onImageSubmit = () => {
        this.setState({imageURL: this.state.input});
        fetch("http://localhost:3000/imageurl", {
            method: "POST",
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                imageURL: this.state.input
            })
        })
        .then(response => {
            if(response) {
                fetch("http://localhost:3000/image", {
                    method: "PUT",
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify({
                        id: this.state.user.id
                    })
                })
                .then(response => response.json())
                .then(count => {
                    this.setState(Object.assign(this.state.user, {entries: count}));
                })
                .catch(console.log);
            }
            return response.json();
        })
        .then(jsonData => this.displayFaceBox(this.calcFaceBox(jsonData)))
        .catch(err => console.log(err));
    }

    onRouteChange = (route) => {
        if(route === 'signin') {
            this.setState(initialState);
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
                <Rank 
                    username={this.state.user.name} 
                    entries={this.state.user.entries} 
                />
                <ImageLinkForm 
                    onInputChange={this.onInputChange}
                    onImageSubmit={this.onImageSubmit}
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
                ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
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
