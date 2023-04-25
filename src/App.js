import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const particlesOptions = {
    background: {
      color: {
          value: "#0d47a1",
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
          onClick: {
              enable: true,
              mode: "push",
          },
          onHover: {
              enable: true,
              mode: "repulse",
          },
          resize: true,
      },
      modes: {
          push: {
              quantity: 4,
          },
          repulse: {
              distance: 200,
              duration: 0.4,
          },
      },
    },
    particles: {
      color: {
          value: "#ffffff",
      },
      links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          width: 1,
      },
      move: {
          directions: "none",
          enable: true,
          outModes: {
              default: "bounce",
          },
          random: false,
          speed: 6,
          straight: false,
      },
      collision: {
          enable: false,
      },
      number: {
          density: {
              enable: true,
              area: 800,
          },
          value: 50,
      },
      opacity: {
          value: 0.5,
      },
      shape: {
          type: "circle",
      },
      size: {
          value: { min: 1, max: 5 },
      },
    },
    detectRetina: true,
}
  


function App() {

  const particlesInit = useCallback(async engine => {
      console.log(engine);
      await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
      await console.log(container);
  }, []);

  return (
    <div className="App">
      <Particles className='particles'
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={particlesOptions}
        />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/* <FaceRecognition /> */}

    </div>
  );
}

export default App;
