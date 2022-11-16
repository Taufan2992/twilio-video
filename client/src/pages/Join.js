import { useState} from "react";
import TwilioVideo from 'twilio-video';
import { useContext } from "react";
import { Videocontext } from "../context/video-context";
import { API } from '../config/api';
import { useEffect } from "react";

function Join() {
  // const [videoState] = useContext(Videocontext)
  const token = localStorage.token
  console.log("Access Token : ", token);
  console.log(token);
  const [videoState, videoDispatch] = useContext(Videocontext)
  const [roomName] = useState(videoState.roomName)
  // console.log(videoState.roomName);
  console.log(roomName);
  const [forms, setForms] = useState({
    username: "",
})
const handleChange = (e) => {
    setForms({
        ...forms,
        [e.target.name]: e.target.value,
    });
};

  const usernameInput = document.getElementById('username');
  const buttonvideo = document.getElementById('join_leave');
  const container = document.getElementById('container');
  const count = document.getElementById('count');
  let [checkConnected, setCheckConnected] = useState("Disconnected");
  let connected = false;
  let room;

  useEffect(() => {
    if (checkConnected === "Disconnected") {
      console.log('====================================');
      console.log("Disconnected");
      console.log('====================================');
    } else {
      console.log('====================================');
      console.log("Connected");
      console.log('====================================');
    }
  }, [checkConnected])
  
  
  const addLocalVideo = async () => {
  const track = await TwilioVideo.createLocalVideoTrack();
  const video = document.getElementById('local').firstElementChild;
  video.appendChild(track.attach());
  };
  
  const connectButtonHandler = async (event) => {
  event.preventDefault();
  if (!connected) {
    const username = usernameInput.value;
    if (!username) {
      alert('Enter your name before connecting');
      return;
    }
    buttonvideo.disabled = true;
    buttonvideo.innerHTML = 'Connecting...';
    try {
      await connect(username);
      buttonvideo.innerHTML = 'Leave call';
      buttonvideo.disabled = false;
    }
    catch (err) {
      console.log(err);
      alert('Connection failed. Is the backend running?');
      buttonvideo.innerHTML = 'Join call';
      buttonvideo.disabled = false;    
    }
  }
  else {
    disconnect();
    buttonvideo.innerHTML = 'Join call';
    connected = false;
    setCheckConnected("Disconnected")
  }
  };
  
  const connect = async () => {
    const body = forms
    console.log("Room Name : ", body);
    const response = await API.post("/join-room");
    if (response?.status === 200) {
        videoDispatch({
            type: 'CONNECT',
            payload: response
        })
    }
  console.log("Response : ", response.data.token);
  const datas = response.data.token
  console.log(datas);
  room = await TwilioVideo.connect(datas);
  
  room.participants.forEach(participantConnected);
  room.on('participantConnected', participantConnected);
  room.on('participantDisconnected', participantDisconnected);
  connected = true;
  setCheckConnected("Connected")
  updateParticipantCount();
  };
  
  const updateParticipantCount = () => {
    if (!connected) {
      count.innerHTML = 'Disconnected.';
    }
    else {
      count.innerHTML = (room.participants.size + 1) + ' participants online.';
    }
  };
  
  const participantConnected = (participant) => {
  const participantDiv = document.createElement('div');
  participantDiv.setAttribute('id', participant.sid);
  participantDiv.setAttribute('class', 'participant');
  
  const tracksDiv = document.createElement('div');
  participantDiv.appendChild(tracksDiv);
  
  const labelDiv = document.createElement('div');
  labelDiv.innerHTML = participant.identity;
  participantDiv.appendChild(labelDiv);
  
  container.appendChild(participantDiv);
  
  participant.tracks.forEach(publication => {
    if (publication.isSubscribed) {
      trackSubscribed(tracksDiv, publication.track);
    }
  });
  participant.on('trackSubscribed', track => trackSubscribed(tracksDiv, track));
  participant.on('trackUnsubscribed', trackUnsubscribed);
  updateParticipantCount();
  };
  
  const participantDisconnected = (participant) => {
  document.getElementById(participant.sid).remove();
  updateParticipantCount();
  };
  
  const trackSubscribed = (div, track) => {
  div.appendChild(track.attach());
  };
  
  const trackUnsubscribed = (track) => {
  track.detach().forEach(element => element.remove());
  };
  
  const disconnect = () => {
  room.disconnect();
  while (container.lastChild.id !== 'local') {
      container.removeChild(container.lastChild);
  }
  buttonvideo.innerHTML = 'Join call';
  connected = false;
  updateParticipantCount();
  };
  
  addLocalVideo();
  // buttonvideo.addEventListener('click', connectButtonHandler);
  
  return (
    <div>
<h1>Twilio Serverless Video Calling</h1>
    <form>
     <p>Name:</p> <input type="text" id="username" onChange={handleChange} name="username" />
      <button id="join_leave" 
      onClick={connectButtonHandler}
      >Join call</button>
    </form>
    <p id="count"></p>
    <div id="container" class="container">
      <div id="local" class="participant">
        <div></div>
        <div>Me</div>
      </div>
      more participants will be added dynamically here
    </div>

    </div>
    
  )
}

export default Join