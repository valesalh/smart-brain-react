import './App.css';
import { Component } from "react";
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesComponent from './components/Particles/ParticlesComponent';


class App extends Component {

    constructor() {
        super();
        this.state = {
            input: "",
        }
    }

    onInputChange = (event) => {
        console.log(event.target.value);
    }

    onSubmit = () => {
        console.log('click');
    }

  render() {
        return (
            <div className="App">
                <ParticlesComponent />
                <Navigation />
                <Logo />
                <Rank />
                <ImageLinkForm 
                    onInputChange={this.onInputChange}
                    onButtonSubmit={this.onSubmit}
                />
                {/* <FaceRecognition /> */}
            </div>
        );
    }
}

export default App;
