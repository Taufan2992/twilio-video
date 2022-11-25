import React, {useState} from 'react'
import sharescreen from "../assets/images/sharescreen.png"

function Screen() {
  const [buttoncolor, setButtoncolor] = useState()

  const handleEntire = () => {
    const btnData = document.getElementById("entire");
    btnData.style.backgroundColor = "rgb(79	129	255)";
    const btnChat = document.getElementById("window");
    btnChat.style.backgroundColor = "rgb(241 245 249)";
    const btnScreen = document.getElementById("tab");
    btnScreen.style.backgroundColor = "rgb(241 245 249)";
  }

  const handleWindow = () => {
    const btnChat = document.getElementById("entire");
    btnChat.style.backgroundColor = "rgb(79	129	255)";
    const btnScreen = document.getElementById("window");
    btnScreen.style.backgroundColor = "rgb(241 245 249)";
    const btnData = document.getElementById("tab");
    btnData.style.backgroundColor = "rgb(241 245 249)";
  }

  // const handleWindow = () => setButtoncolor(2);
  const handleTab = () => setButtoncolor(3);

    // if (buttoncolor === 1) {
    //   const btnData = document.getElementById("entire");
    //   btnData.style.backgroundColor = "rgb(79	129	255)";
    //   const btnChat = document.getElementById("window");
    //   btnChat.style.backgroundColor = "rgb(241 245 249)";
    //   const btnScreen = document.getElementById("tab");
    //   btnScreen.style.backgroundColor = "rgb(241 245 249)";
    // } else if (buttoncolor === 2) {
    //   const btnChat = document.getElementById("entire");
    //   btnChat.style.backgroundColor = "rgb(79	129	255)";
    //   const btnScreen = document.getElementById("window");
    //   btnScreen.style.backgroundColor = "rgb(241 245 249)";
    //   const btnData = document.getElementById("tab");
    //   btnData.style.backgroundColor = "rgb(241 245 249)";
    // } else if (buttoncolor === 3) {
    //   const btnScreen = document.getElementById("entire");
    //   btnScreen.style.backgroundColor = "rgb(79	129	255)";
    //   const btnChat = document.getElementById("window");
    //   btnChat.style.backgroundColor = "rgb(241 245 249)";
    //   const btnData = document.getElementById("tab");
    //   btnData.style.backgroundColor = "rgb(241 245 249)";
    // }

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