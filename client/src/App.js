import { useEffect,useState } from 'react';
import './App.css';
import io from 'socket.io-client';
const socket = io.connect("http://localhost:3001");

function App() {
  const [message, setMessage] = useState('');
  const [messageRec, setMessageRec] = useState('');
  const [room, setRoom] = useState('');

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
      alert('Room :'+ room);
    }
  };
  // Sending message on click
  const sendMessage = () => {
    socket.emit('send_Message', { message,room });
    
  
  }
  useEffect(() => {
    socket.on('received', (data) => {
      setMessageRec(data.message);
    })
  }, [socket])
  return (
    <div className="App">
      <input type="text" placeholder="Message..." onChange={(e)=>setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send Message</button>
      <input type="text" placeholder='Join Room' onChange={(e) => setRoom(e.target.value)} />
      <button onClick={joinRoom}>Join Room</button>
      <div className="mes-body">
        <h1>Received Message</h1>
        <h2>{messageRec}</h2>
      </div>
      <div className="sen-body">
        <h1>Sending Message</h1>
        <h2>{message}</h2>
      </div>
    </div>
  );
}

export default App;
