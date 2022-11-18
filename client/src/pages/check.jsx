import { useState} from "react";
import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import adira from "../assets/images/adira.png";
import icon from "../assets/images/icon.png";
import ready from "../assets/images/ready.png";
import { useContext } from "react";
import { Videocontext } from "../context/video-context";
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
    console.log(token);
    const Navigate = useNavigate();

    const handleRoom = async (e) => {
        e.preventDefault();
        console.log("tutup");
        // setIsVideoActive((current) => !current);
        // const box = document.getElementById("box");
        // const tracks = await createLocalTracks();
        // const LocalVideoTrack = tracks.find(track => track.kind === 'video');
        // LocalVideoTrack.disable()
        // console.log(tracks);
        Navigate('/room')
    }

  return (
    <>
      <div style={{ backgroundColor: "#FAFAFA", height: "100vh" }}>
        <Container className="py-4">
          <Row>
            <Col xs={6} className="align-item-center">
              <Image src={adira} />
              <p
                className="textDefault d-inline ms-3"
                style={{ fontSize: 35, fontWeight: 300 }}
              >
                SURVEY VIDEO
              </p>
            </Col>
            <Col xs={6}  className="text-end">
              <Row>
                <Col xs={10}>
                  <p className="mb-0 mt-2">{state.user}</p>
                  <p className="m-0">Surveyor</p>
                </Col>
                <Col xs={2}>
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
              style={{paddingLeft: 30 ,position:"relative"}}
            >

              <div  id="box"></div>

              <Buttonvid/>
            </Col>
            <Col sm={4} className="px-3">
              <Card
                className="rounded-4 text-center me-3"
                style={{ height: 404 }}
              >
                <Card.Img variant="top" src={ready} className="w-75 pt-3 m-auto" />
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
        </div>

    </>
  );
}
