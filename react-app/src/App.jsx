import Gun from "gun";
import { useEffect, useState } from "react";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const [name, setName] = useState("");
  const gun = Gun({
    peers: ["http://localhost:4000/gun"],
  });

  useEffect(() => {
    const messagesFetched = gun.get("messages");
    messagesFetched.map().on((item) => {
      setMessages((prevState) => [...new Set([...prevState, item])]);
    });
  }, []);

  const handleSubmit = () => {
    const messages = gun.get("messages");
    messages.set({
      name: name,
      message: messageContent,
      createdAt: Date.now(),
    });
  };

  return (
    <>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Write your name here !"
        />
        <input
          type="text"
          placeholder="Write you message here !"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
        />
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <div>
        {messages.map((item) => (
          <div key={item.createdAt}>
            <h2>{item.message}</h2>
            <h3>{item.name}</h3>
          </div>
        ))}
      </div>
    </>
  );
};
export default App;
