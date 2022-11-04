// import * as React from "react";
// import { render } from "react-dom";
// import { Button } from "reactstrap";
// import { connect, Room, createLocalVideoTrack } from "twilio-video";
// import "bootstrap/dist/css/bootstrap.min.css";

// import "./styles.css";

// const TOKEN =
//   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2JhMTEzYzRjYjlhZTA2OTYzNWYzYTg3ZGQ0M2U1NmM1LTE1NzQ0Mjg3MjIiLCJpc3MiOiJTS2JhMTEzYzRjYjlhZTA2OTYzNWYzYTg3ZGQ0M2U1NmM1Iiwic3ViIjoiQUMxN2ZlZGViNTRjNTc1MzRmY2RlMzdlMzcwOWM2OWYxOSIsImV4cCI6MTU3NDQzMjMyMiwiZ3JhbnRzIjp7ImlkZW50aXR5Ijoib3AiLCJ2aWRlbyI6eyJyb29tIjoibWx1dmlpLXJvb20ifX19.vre7Lnon6axJMlHcfGctNKFLLKtvZNYpN0a3tewVfDA";
// const ROOM_NAME = "mluvii-room";

// class App extends React.Component {
//   state = {
//     connected: false,
//     pending: false
//   };

//   room: Room;

//   componentDidMount() {
//     createLocalVideoTrack().then(track => {
//       const localMediaContainer = document.getElementById("local-media");
//       localMediaContainer.appendChild(track.attach());
//     });
//   }

//   render() {
//     const { connected, pending } = this.state;
//     return (
//       <div className="App">
//         <h1 className="my-3">Mluvii ♥ Twilio</h1>
//         <div id="local-media" />
//         <div id="remote-media-div" />

//         <div>
//           <Button
//             className="mr-3"
//             disabled={pending}
//             color={connected ? "danger" : "primary"}
//             onClick={connected ? this.disconnectFromRoom : this.connectToRoom}
//           >
//             {this.state.connected ? "Disconnect" : "Connect to room"}
//           </Button>
//           {pending && "Processing..."}
//         </div>
//       </div>
//     );
//   }

//   private connectToRoom = () => {
//     this.setState({ pending: true });

//     connect(
//       TOKEN,
//       { name: ROOM_NAME }
//     ).then(
//       room => {
//         console.log(`Successfully joined a Room: ${room}`);
//         this.setState({ connected: true, pending: false });

//         room.on("participantConnected", participant => {
//           console.log(`A remote Participant connected: ${participant}`);

//           participant.tracks.forEach(track => {
//             document.getElementById("remote-media-div").appendChild(track.attach());
//           });

//           participant.on("trackAdded", track => {
//             document.getElementById("remote-media-div").appendChild(track.attach());
//           });
//         });

//         room.on("disconnected", room => {
//           // Detach the local media elements
//           this.setState({ connected: false, pending: false });
//           room.localParticipant.tracks.forEach(track => {
//             const attachedElements = track.detach();
//             attachedElements.forEach(element => element.remove());
//           });
//         });
//         this.room = room;
//       },
//       error => {
//         console.error(`Unable to connect to Room: ${error.message}`);
//       }
//     );
//   };

//   private disconnectFromRoom = () => {
//     this.setState({ pending: true });
//     if (this.room) {
//       this.room.disconnect();
//       this.room = null;
//     }
//   };
// }

// const rootElement = document.getElementById("root");
// render(<App />, rootElement);
