import React from "react";
import "../style.css";
import plane from "../assets/images/plane.png";

function Chat() {
  return (
    <div>
      <div className="textHead mb-4">Chat</div>

      {/* <div className="overflow-auto fw-bold" style={{ height: 400 }}>
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

      </div> */}

      <div className="container-position">
        <div className="container-scroll" style={{ height: 400 }}>
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
              <div className="chatbox-receiper p-2 d-inline">
                Baik pak 🔥🔥🔥
              </div>
            </div>
            <div className="timechat p-2 text-start">09:00</div>
          </div>

          <div>
            <div className="d-flex justify-content-start">
              <div className="chatbox-receiper p-2 d-inline">
                untuk prosesnya kurang lebih berapa lama ya pak?, sampai nanti
                di approve
              </div>
            </div>
            <div className="timechat p-2 text-start">09:00</div>
          </div>

          <div>
            <div className="d-flex justify-content-end">
              <div className="chatbox p-2 d-inline">
                saya belum bisa memastikan ☺
              </div>
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
              <div className="chatbox-receiper p-2 d-inline">
                Saya tunggu kabarnya
              </div>
            </div>
            <div className="timechat p-2 text-start">09:00</div>
          </div>
        </div>
        <div className="wrapper"></div>
      </div>

      <form method="post" className="index-search-form w-100">
        <input
          name="search"
          type="text"
          className="search-box w-100 p-2 p-relative"
          placeholder="Write a message.."
        />
        <input type="file" id="attach" hidden />
        <label htmlFor="attach" style={{ fontSize: 24, position:"absolute", right:"20%"}}>
          +
        </label>
        <button
          className="round-button-message ms-3"
          type="button"
        >
          <img src={plane} className="plane-button" alt=""/>
        </button>
      </form>
    </div>
  );
}

export default Chat;
