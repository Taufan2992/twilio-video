import React from "react";
import "../style.css";
import plane from "../assets/images/plane.png";

function Chat() {
  return (
    <div className="p-relative">
      <div className="textHead mb-4">Chat</div>

      <div className="overflow-auto fw-bold" style={{ height: 400 }}>
        <div>
          <div className="d-flex justify-content-end">
            <div className="chatbox p-2 d-inline">halo, selamat pagi pak</div>
          </div>
          <div className="timechat p-2 text-end">09:00</div>
        </div>
        <div>
          <div className="d-flex justify-content-end">
            <div className="chatbox p-2 d-inline">bagaimana kabarnya??</div>
          </div>
          <div className="timechat p-2 text-end">09:00</div>
        </div>

        <div>
          <div className="d-flex justify-content-start">
            <div className="chatbox-receiper p-2 d-inline">Baik pak 🔥🔥🔥</div>
          </div>
          <div className="timechat p-2 text-start">09:00</div>
        </div>

        <div>
          <div className="d-flex justify-content-start">
            <div className="chatbox-receiper p-2 d-inline">untuk prosesnya kurang lebih berapa lama ya pak?, sampai nanti di approve</div>
          </div>
          <div className="timechat p-2 text-start">09:00</div>
        </div>

        <div>
          <div className="d-flex justify-content-end">
            <div className="chatbox p-2 d-inline">saya belum bisa memastikan ☺</div>
          </div>
          <div className="timechat p-2 text-end">09:00</div>
        </div>

        <div>
          <div className="d-flex justify-content-start">
            <div className="chatbox-receiper p-2 d-inline">Baik pak</div>
          </div>
          <div className="timechat p-2 text-start">09:00</div>
        </div>

        <div>
          <div className="d-flex justify-content-start">
            <div className="chatbox-receiper p-2 d-inline">Saya tunggu kabarnya</div>
          </div>
          <div className="timechat p-2 text-start">09:00</div>
        </div>

      </div>
<div  className="wapper"></div>
      <hr />

      <form method="post" className="index-search-form" >
        <input
          name="search"
          type="text"
          className="search-box col-10 p-2"
          placeholder="Write a message.."
        />
        <input type="file" id="attach" hidden />
        <label htmlFor="attach" style={{ fontSize: 24 }}>
          +
        </label>
        <div
          className="m-auto p-2 rounded-circle"
          style={{ backgroundColor: "#FCD733" }}
        >
          <img src={plane} width={20} height={20} />
        </div>
      </form>





      <div class="container">
<div class="container-scroll">
  <div class="text-box">
    Some text
  </div>
   <div class="text-box">
    Some text
  </div>
   <div class="text-box">
    Some text
  </div>
  
   <div class="text-box">
    Some text
  </div>
  
   <div class="text-box">
    Some text
  </div>
     <div class="text-box">
    Some text
  </div>
  
   <div class="text-box">
    Some text
  </div>
     <div class="text-box">
    Some text
  </div>
  
   <div class="text-box">
    Some text
  </div>
     <div class="text-box">
    Some text
  </div>
  
   <div class="text-box">
    Some text
  </div>
  </div>
  <div class="wrapper"></div>
  
</div>
    </div>
  );
}

export default Chat;
