import 'aframe'
import 'aframe-animation-component'
import 'aframe-particle-system-component'
import 'babel-polyfill'
import { Entity, Scene } from 'aframe-react'
import React from 'react'
import ReactDOM from 'react-dom'
import Simulation from './simulation'
import Menu from './menu'
import Navigator from './navigator'
import setUpAudio from './audio'
import loadAllAssets from './assets'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inSim: false,
      isNavigator: false
    }
    this.setRole = this.setRole.bind(this)
  }

  setRole(isNavigator) {
    this.setState({ isNavigator: isNavigator, inSim: true })
    // SETS UP AUDIO Navigator is initiator for signal. Arbritrary decision for this.
    setUpAudio(isNavigator)
  }

  render() {

    let destination = <Menu setRole={this.setRole}/>

    if (this.state.inSim && !this.state.isNavigator){destination = <Simulation/>}

    return (
    <div>
      {this.state.isNavigator ? <Navigator/> :

      <Scene>
        {loadAllAssets()}

        {destination}

      </Scene>}

      </div>
    )
  }
}
ReactDOM.render(<App />, document.querySelector('#sceneContainer'));
