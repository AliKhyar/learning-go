import { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import "./App.css";

function App() {
  const [socketUrl, setSocketUrl] = useState("ws://localhost:9100/socket");
  const [message, setMessage] = useState("");
  const [history, setMessageHistory] = useState([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      console.log("last msg is: ", lastMessage);
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
    console.log(history);
  }, [lastMessage, setMessageHistory]);

  const handleChange = (event) => {
    setMessage(event.target.value);

    // console.log("value is:", event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();

    // 👇️ value of input field
    // console.log("handleClick 👉️", message);
    sendMessage(JSON.stringify({ greeting: message }), []);
  };

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];
  return (
    <div>
      <input
        type="text"
        id="message"
        name="message"
        onChange={handleChange}
        value={message}
        // autoComplete="off"
      />

      <h2>Message: {message}</h2>

      <button onClick={handleClick}>Click</button>
      <div>
        <span>The WebSocket is currently {connectionStatus}</span>
        {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
        <ul>
          {history.map((message, idx) => (
            <span key={idx}>{message ? message.data : null}</span>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
