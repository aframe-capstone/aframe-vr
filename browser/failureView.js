import React from 'react'
import {connect} from 'react-redux'
//import explosion from '.././public/./assets/explodingShip'

const mapStatetoProps = (state) =>{
  return{
    strikes: state.strikes
  }
}

 function Failure(props){

     return(
      props.strikes===3 ?
      <div>
        <img style={{height:'750px', width: 'auto'}} src='/assets/explodingShip.gif'/>
      </div>
     : null
    )
  }



const FailureView = connect(mapStatetoProps)(Failure)
export default FailureView
