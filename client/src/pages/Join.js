import { useState, useEffect, useRef} from "react";
import TwilioVideo from 'twilio-video';
import { useContext } from "react";
import { Videocontext } from "../context/video-context";

function Join() {
    const [videoState] = useContext(Videocontext)
    const token = localStorage.token
    console.log("Access Token : ", token);
    const [roomName] = useState(videoState.roomName)
    console.log(videoState.roomName);
    console.log(token);
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
  return (
    <div>
        <h1>Your are in room: {roomName}</h1>
        <div ref={localVideoRef}></div>
        <div ref={remoteVideoRef}></div>
    </div>
  )
}

export default Join