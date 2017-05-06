import 'aframe'
import 'aframe-animation-component'
import 'aframe-particle-system-component'
import 'babel-polyfill'
import {Entity, Scene, Animation} from 'aframe-react'
import React from 'react'
import ReactDOM from 'react-dom'
import Peer from 'simple-peer'
import 'aframe-ui-widgets'
import 'aframe-fence-component'
import Sun from './Sun'

const navigatorCam = (<Entity position="0 20 0" rotation="-90 0 0" primitive="a-camera" look-controls-enabled="false" wasd-controls-enabled="false">
</Entity>)

const driverCam = (<Entity position="0 2.25 1" >
  <Entity fence="width: 3; depth: 4; x0: 0; z0: 1" userHeight="0.6" primitive="a-camera" look-controls-enabled="true" wasd-controls-enabled="true" />
  {/* <Entity primitive="a-light" type="spot" intensity="0.1" position="2 1 4"/> */}
</Entity>)

const warningLight = (<Entity id="warning-light" position="0 5.3 0.4" primitive="a-cone" geometry={{radiusBottom: 0.21, radiusTop: 0.33, height: 0.3}} opacity="0.4" transparent animation={{property: 'material.color', from: '#000', to: '#900', ease: 'linear', loop: 'true', direction: 'ease-in'}}>
  <Entity primitive="a-light" type="hemisphere" position="0, 0, 0" intensity='5' animation={{property: 'color', from: '#000', to: '#900', loop: 'true', ease: 'ease-in', direction: 'alternate'}} />
  {/* Uncomment this line to enable alarm sound (disabled to avoid going crazy while testing)<Entity primitive='a-sound' src="#alarm" loop="true" autoplay="true" position="0 0 0" /> */}
</Entity>)

function generatePanel(xDimension, zDimension) {
  const panel = []
  for (let tempX = 0; tempX <= xDimension; tempX+=1) {
    for (let tempZ = 0; tempZ <= zDimension; tempZ+=1) {
      panel.push(generateModule(-1, 0, 0))
      panel.push(generateModule(0, 0, 0))
    }
  }
  return panel
}

function generateModule(initialXCoord, initialYCoord, initialZCoord) {
  const module = []
  let length = initialXCoord + 3
  for (var i = initialXCoord; i < length; i++) {
    initialXCoord+=0.3
    module.push(generateLever(initialXCoord, initialZCoord, 'red'))
  }
  return module
}

function generateButton(x, z, color) {
  return <Entity ui-button color={color} position={{x: `${x}`, y: 0.02, z: `${z}`}} >
    <Entity position={{x: 0, y: 0, z: 0}} geometry={{width: 'auto', height: 'auto'}} />
  </Entity>
}

function generateLever(x, z, color) {
  return <Entity ui-toggle color={color} position={{x: `${x}`, y: 0.02, z: `${z}`}} >
    <Entity position={{x: 0, y: 0, z: 0}} geometry={{width: 'auto', height: 'auto'}} />
  </Entity>
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default class Simulation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      renderCockpit: true,
      cockpit: []
    }
  }

  changeColor() {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue']
    this.setState({
      color: colors[Math.floor(Math.random() * colors.length)]
    })
  }

  stopInteriorRender() {
    this.setState({renderCockpit: false})
  }

  componentWillMount() {
    if (this.state.renderCockpit) {
      // Set interior's state here?
    }
    this.stopInteriorRender()
  }

  // Two panels are temporarily disabled for our alpha! Don't delete!
  render() {
    return (
      <Entity >
        <Entity static-body obj-model={{obj: '#cockpit', mtl: '#cockpitMaterial'}}
          position={{x: 0, y: 4, z: 0}}
          ></Entity>
        <Entity color="#213033"
          primitive="a-box" width="2.2" height="0.01" depth="0.7" rotation={{x: 60, y: 90, z: 0}} position={{x: -1.5, y: 3.5, z: 2.5}} >
          {generatePanel(1, 1)}
        </Entity>
        {/* <Entity color="#213033" primitive="a-box" width="2.2" height="0.01" depth="0.7" rotation={{x: 60, y: -90, z: 0}} position={{x: 1.5, y: 3.5, z: 2.5}} >
          {generatePanel(1,1)}
        </Entity>
        <Entity color="#213033" primitive="a-box" width="2.2" height="0.01" depth="0.7" rotation={{x: 60, y: 0, z: 0}} position={{x: 0, y: 3.5, z: 0}} >
          {generatePanel(1,1)}
        </Entity> */}
        {warningLight}
        <Entity primitive="a-sky" height="2048" radius="30" src="#skyTexture" theta-length="90" width="2048"/>
        {Sun}
        {driverCam}
      </Entity>
    )
  }
}

const ExamplePanel = <Entity color="#213033" primitive="a-box" width="2.2" height="0.01" depth="0.7" rotation={{x: 60, y: 0, z: 0}} position={{x: 0, y: 4, z: 0}} >
  {generatePanel(1, 1)}</Entity>
