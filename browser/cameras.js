import React from 'react'
import {Entity} from 'aframe-react'
import Clock from 'react-countdown-clock'

const countdown =( minutes, seconds ) =>{
    var element, endTime, hours, mins, msLeft, time;

    const twoDigits =( n ) =>
    {
        return (n <= 9 ? "0" + n : n);
    }

    const updateTimer =() =>
    {
        msLeft = endTime - (+new Date);
        if ( msLeft < 1000 ) {
            console.log('OH NO');
        } else {
            time = new Date( msLeft );
            hours = time.getUTCHours();
            mins = time.getUTCMinutes();
     dispatch((hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds() ));
            setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
        }
    }
    endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
    updateTimer();
}
// every second dispatch an action to the store // countdown// every time a reducer gets a countdown action

//countdown... every time it goes down, the component that needs it subscribes to it using mapStatetoProps

//now.getSeconds()



const navigatorCam = (<Entity
  position="0 20 0"
  rotation="-90 0 0"
  primitive="a-camera"
  look-controls-enabled="false"
  wasd-controls-enabled="false">
</Entity>)

const DriverCam = (<Entity id='driverCamera' position="0 2.25 1" >
  <Entity fence="width: 3; depth: 4; x0: 0; z0: 1"
    userHeight="0.6"
    primitive="a-camera"
    look-controls-enabled="true"
    wasd-controls-enabled="true">
    <Entity primitive="a-cursor"
      events={{}}
      position={{x: 0, y: 0, z: -0.2}}
      scale='0.1 0.1 0.1'
      animation__click={{
        property: 'scale',
        startEvents: 'click',
        from: '0.1 0.1 0.1',
        to: '0.3 0.3 0.3',
        dur: 150
      }}/>
    <Entity text={{value: 'INCOMING TRANSMISSION'}}
      // animation={{
      //   property: 'material.opacity',
      //   from: '0',
      //   to: '1.0',
      //   loop: 'true',
      //   ease: 'ease-in',
      //   direction: 'alternate'}}
      position={{
        x: 0.3,
        y: -0.45,
        z: -0.6
      }}/>
    <Entity position={{
      x: 0.35,
      y: 0.45,
      z: -0.6
    }}> <Clock id='clock' seconds ={180} color={'#000'} alpha ={0.9} size={300}/>
  </Entity>
  </Entity>
</Entity>)

export {DriverCam, navigatorCam}
