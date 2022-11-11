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

    const handleRoom = async (e) => {
        e.preventDefault();
        console.log("tutup");
        // setIsVideoActive((current) => !current);
        const box = document.getElementById("box");
        const tracks = await createLocalTracks();
        const LocalVideoTrack = tracks.find(track => track.kind === 'video');
        LocalVideoTrack.disable()
        console.log(tracks);
        Navigate('/room')
    }

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
        {/* <h1>Your are in room: {roomName}</h1>
          <div ref={localVideoRef}></div>
          <div ref={remoteVideoRef}></div> */}
        </div>

    </>
  );
}
