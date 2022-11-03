import { useState } from "react";
import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import adira from "../assets/images/adira.png";
import icon from "../assets/images/icon.png";
import ready from "../assets/images/ready.png";
import { useContext } from "react";
import { Videocontext } from "../context/video-context";
import { Twilio, createLocalVideoTrack, TrackPublication, Participant, Track, connect, createLocalTracks } from 'twilio-video'
import { Usercontext } from "../context/user-context";
import Buttonvid from "../partial/Buttonvid";
import "../style.css"
import { useNavigate } from "react-router-dom"

export default function Check() {
    const [videoState] = useContext(Videocontext)
    const [state] = useContext(Usercontext)
    const token = localStorage.token
    console.log("Access Token : ", token);
    const [user] = useState(state.user)
    const [roomName] = useState(videoState.roomName)
    console.log(videoState.roomName);
    const Navigate = useNavigate();

    const handleRoom = (e) => {
        e.preventDefault();

        Navigate('/room')
    }
  
//   async function startVideo() {
//     const track = await createLocalVideoTrack();
//     const box = document.getElementById("box");
//     box.append(track.attach());
//     console.log("Local Video Track : ", track);
//   }
  async function start() {
    const startButton = document.getElementById("start")
    if (startButton.value === "on") {
        startButton.value = "off"
        // startButton.innerHTML = ""
        const tracks = await createLocalTracks({
            audio: true,
            video: { width: 20}
    });
        const box = document.getElementById("box");
        const LocalVideoTrack = tracks.find(track => track.kind === 'video');
        box.appendChild(LocalVideoTrack.attach());
    } else {
        startButton.value = "on"
        const tracks = await createLocalTracks();
        const box = document.getElementById("box");
        box.innerHTML = ""
        tracks.stop()
    }
}

async function room() {
    const tracks = await createLocalTracks({
        audio: true,
        video: {facingMode: 'user'}
    })
    const username = user
    const nameRoom = roomName
    const LocalVideoTrack = tracks.find(track => track.kind === 'video');
    const box = document.getElementById("box");
    const on = document.getElementById("on-btn");
    const name = document.getElementById("name")
    const rooms = document.getElementById("roomName")
    await connect(`${token}`, {
        name: `${roomName}`,
        tracks
    })
    box.appendChild(LocalVideoTrack.attach());
    // on.style.visibility = "hidden";
    console.log("Local Tracks : ", tracks);
    console.log("You are connect to room : ", nameRoom);
    console.log("User Name : ", username);
    // name.append(document.createTextNode(username))
    // rooms.append(document.createTextNode(`You are connected to room : ${nameRoom}`))
    Navigate('/room')
  };

  return (
    <>
      <div style={{ backgroundColor: "#FAFAFA", height: "100vh" }}>
        <Container className="py-4">
          <Row>
            <Col sm={6} md={6} className="align-item-center">
              <Image src={adira} />
              <p
                className="textDefault d-inline ms-3"
                style={{ fontSize: 35, fontWeight: 300 }}
              >
                SURVEY VIDEO
              </p>
            </Col>
            <Col sm={6} md={6} className="text-end">
              <Row>
                <Col sm={10}>
                  <p className="mb-0 mt-2">Lucky Christopher Chen</p>
                  <p className="m-0">Surveyor</p>
                </Col>
                <Col sm={2}>
                  <Image src={icon} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col
              sm={8}
              className="rounded-4"
              style={{ position: "relative", paddingLeft: 50 }}
            >

              <div id="box">{start}</div>
              
              <Buttonvid />
            </Col>
            <Col sm={4}>
              <Card
                className="rounded-4 text-center me-5"
                style={{ height: 480 }}
              >
                <Card.Img variant="top" src={ready} className="px-5 py-4" />
                <Card.Body>
                  <Card.Title
                    className="textDefault py-4"
                    style={{ fontSize: 30, fontWeight: 800, marginTop: 10 }}
                  >
                    Ready to join
                  </Card.Title>
                  <Button
                    variant="warning"
                    className="container py-2"
                    style={{ fontSize: 12, marginTop: 70 }}
                    onClick={room}
                  >
                    Join Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      {/* <button onClick={startVideo}>Video on</button>
            <div id='box'></div>
            <button onClick={startRoom}>Join Room</button>
            <div className='videos'>
                <div id='video-container'></div>
                <p id='name'></p>
            </div> */}
    </>
  );
}
