import React, {useState} from 'react'
import sharescreen from "../assets/images/sharescreen.png"

function Screen() {


  return (
    <div  style={{height:490}}>
      <div className='fw-bold'>Screen</div>

      <div className='d-flex mt-3'>
        <button className='btn btncolor rounded-3 me-1' style={{width:"40%", fontSize:14}}>Entire Screen</button>
        <button className='btn btncolor rounded-3 mx-2' style={{width:"30%", fontSize:14}}>Window</button>
        <button className='btn btncolor rounded-3 ms-1' style={{width:"30%", fontSize:14}}>On Tab</button>
      </div>

      <div className='mt-4'>
        <img src={sharescreen} width="100%" alt="" />
      </div>
    </div>
    
  )
}

export default Screen