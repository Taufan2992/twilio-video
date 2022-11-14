import React from 'react'
import "../style.css";
import plane from "../assets/images/plane.png" 

function Chat() {
  return (
    <div className='fw-bold' style={{height:490}}>
      <div className='textHead'>Chat</div>
      <div className='mt-4' >
      <div className='d-flex justify-content-end'>
        <div className='chatbox p-2 d-inline'>halo</div>
      </div>
      <div className='timechat p-2 text-end'>09:00</div>
      </div>

      <div className='mt-2' >
      <div className='d-flex justify-content-start'>
        <div className='chatbox-receiper p-2 d-inline'>halo</div>
      </div>
      <div className='timechat p-2 text-start'>09:00</div>
      </div>

      {/* <div>
        <input placeholder='Write a message' className='inputChat col-10 p-2' />
        <div>
        <button className='addChat'>+</button>
        </div>
      </div> */}
      <form method="post" className="index-search-form">
  <input name="search" type="text" className="search-box col-10 p-2" placeholder="Write a message.." />
  <button name="submit" className="" type="submit" >+</button>
  <div><img src={plane} /></div>
</form>

      {/* <div>
        <div className='d-flex justify-content-start'>abc</div>
        <div className='d-flex justify-content-end'>def</div>
      </div>
      <div>
        <input></input>
      </div> */}
    </div>
  )
}

export default Chat