import React , { Component } from 'react';
import './App.css';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

const app = new Clarifai.App({
  apiKey: 'd12aaf44e08641828c6a4b72f1db9a0f'
 });

const particleOptions = {
  particles : {
    number : {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}
class App extends Component {
  constructor(){
    super();
    this.state = {
      input : '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  /*To calculate the face parameters*/

  calculateFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    //console.log(clarifaiFace);
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    //console.log(width, height);
    return {
      leftCol: (clarifaiFace.left_col * width),
      topRow: (clarifaiFace.top_row * height),
      rightCol: (width -(clarifaiFace.right_col * width)),
      bottomRow: (height - (clarifaiFace.bottom_row * height))
    }
  }

  displayBox = (box) => {
    this.setState({box});
  }
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.displayBox(this.calculateFaceLocation(response)))
    .catch(err => console.log('Error', err));    
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
    this.setState({isSignedIn: false});
    }
    else if (route === 'home'){
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }
  render() {
    const {isSignedIn, route, box, imageUrl} = this.state;
    return (
      <div className="App">
        <Particles className='particle'
              params={particleOptions}
            />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'home'
        ? <div>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition box = {box} imageUrl={imageUrl}/>
          </div>
        : (
          this.state.route === 'signin'
            ? <SignIn onRouteChange={this.onRouteChange} />
            : <Register onRouteChange={this.onRouteChange} />
        )
        }
      </div>
    );
  }
} 

export default App;
