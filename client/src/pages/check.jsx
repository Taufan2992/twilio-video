import { useState, useEffect, useRef} from "react";
import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import adira from "../assets/images/adira.png";
import icon from "../assets/images/icon.png";
import ready from "../assets/images/ready.png";
import { useContext } from "react";
import { Videocontext } from "../context/video-context";
import { connect, createLocalTracks } from 'twilio-video'
import { Usercontext } from "../context/user-context";
import Buttonvid from "../partial/Buttonvid";
import "../style.css"
import { useNavigate } from "react-router-dom"
import TwilioVideo from 'twilio-video';

export default function Check() {
    const [videoState] = useContext(Videocontext)
    const [state] = useContext(Usercontext)
    const token = localStorage.token
    console.log("Access Token : ", token);
    const [user] = useState(state.user)
    const [roomName] = useState(videoState.roomName)
    console.log(videoState.roomName);
    console.log(token);
    const Navigate = useNavigate();
    // const [room, setRoom] = useState(null);
    const localVideoRef = useRef();
    const remoteVideoRef = useRef();

    function appendNewParticipant(track, identity) {
      const chat = document.createElement('div');
      chat.setAttribute('id', identity);
      chat.appendChild(track.attach());
      remoteVideoRef.current.appendChild(chat);
    }
    useEffect(() => {
      console.log('Trying to connect to Twilio with token', token);
      TwilioVideo.connect(token, {
        video: true,
        audio: true,
        name: roomName,
      })
        .then((roomName) => {
          console.log('connected to Twilio');
          TwilioVideo.createLocalVideoTrack().then((track) => {
            localVideoRef.current.appendChild(track.attach());
          });
          function removeParticipant(participant) {
            console.log(
              'Removing participant with identity',
              participant.identity
            );
            const elem = document.getElementById(participant.identity);
            elem.parentNode.removeChild(elem);
          }
          function addParticipant(participant) {
            console.log('Adding a new Participant');
            participant.tracks.forEach((publication) => {
              if (publication.isSubscribed) {
                const track = publication.track;
                appendNewParticipant(track, participant.identity);
                console.log('Attached a track');
              }
            });
            participant.on('trackSubscribed', (track) => {
              appendNewParticipant(track, participant.identity);
            });
          }
          roomName.participants.forEach(addParticipant);
          roomName.on('participantConnected', addParticipant);
          roomName.on('participantDisconnected', removeParticipant);
        })
        .catch((e) => {
          console.log('An error happened', e);
        });
      return () => {};
    }, []);


    const handleRoom = async (e) => {
        e.preventDefault();
        
        Navigate('/join')
    }

    function appendNewParticipant(track, identity) {
      const chat = document.createElement('div');
      chat.setAttribute('id', identity);
      chat.appendChild(track.attach());
      remoteVideoRef.current.appendChild(chat);
    }
    useEffect(() => {
      console.log('Trying to connect to Twilio with token', token);
      TwilioVideo.connect(token, {
        video: true,
        audio: true,
        name: roomName,
      })
        .then((roomName) => {
          console.log('connected to Twilio');
          TwilioVideo.createLocalVideoTrack().then((track) => {
            localVideoRef.current.appendChild(track.attach());
          });
          function removeParticipant(participant) {
            console.log(
              'Removing participant with identity',
              participant.identity
            );
            const elem = document.getElementById(participant.identity);
            elem.parentNode.removeChild(elem);
          }
          function addParticipant(participant) {
            console.log('Adding a new Participant');
            participant.tracks.forEach((publication) => {
              if (publication.isSubscribed) {
                const track = publication.track;
                appendNewParticipant(track, participant.identity);
                console.log('Attached a track');
              }
            });
            participant.on('trackSubscribed', (track) => {
              appendNewParticipant(track, participant.identity);
            });
          }
          roomName.participants.forEach(addParticipant);
          roomName.on('participantConnected', addParticipant);
          roomName.on('participantDisconnected', removeParticipant);
        })
        .catch((e) => {
          console.log('An error happened', e);
        });
      return () => {};
    }, []);

// async function rooms() {
//     const tracks = await createLocalTracks({
//         audio: true,
//         video: {facingMode: 'user'}
//     })
//     const username = user
//     const nameRoom = roomName
//     const LocalVideoTrack = tracks.find(track => track.kind === 'video');
//     const box = document.getElementById("box");
//     const on = document.getElementById("on-btn");
//     const name = document.getElementById("name")
//     const rooms = document.getElementById("roomName")
//     await connect(`${token}`, {
//         name: `${roomName}`,
//         tracks
//     })
//     box.appendChild(LocalVideoTrack.attach());
//     // on.style.visibility = "hidden";
//     console.log("Local Tracks : ", tracks);
//     console.log("You are connect to room : ", nameRoom);
//     console.log("User Name : ", username);
//     // name.append(document.createTextNode(username))
//     // rooms.append(document.createTextNode(`You are connected to room : ${nameRoom}`))
//     Navigate('/room')
//   };

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
                  <p className="mb-0 mt-2">{state.user}</p>
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
              style={{ position: "relative", paddingLeft: 30 }}
            >

              <div id="box"></div>

              <Buttonvid />
            </Col>
            <Col sm={4} className="px-3">
              <Card
                className="rounded-4 text-center me-3"
                style={{ height: 404 }}
              >
                <Card.Img variant="top" src={ready} className="px-5 py-4" />
                <Card.Body>
                  <Card.Title
                    className="textDefault py-3"
                    style={{ fontSize: 30, fontWeight: 800, marginTop: 6 }}
                  >
                    Ready to join
                  </Card.Title>
                  <Button
                    variant="warning"
                    className="container"
                    style={{ fontSize: 12, marginTop: 8, paddingTop:12, paddingBottom:12 }}
                    onClick={handleRoom}
                  >
                    Join Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <h1>Your are in room: {roomName}</h1>
        <div ref={localVideoRef}></div>
        <div ref={remoteVideoRef}></div>
      </div>

    </>
  );
}
