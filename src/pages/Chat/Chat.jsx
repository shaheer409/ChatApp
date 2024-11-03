import React, { useEffect, useState } from 'react';
import './Chat.css';
import { auth, db } from '../../firebase';
import { collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [editMessageId, setEditMessageId] = useState(null);
  const [editMessageText, setEditMessageText] = useState('');

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() });
      });
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage) return;
    
    
    await addDoc(collection(db, "messages"), {
      text: newMessage,
      senderId: auth.currentUser.uid,
      timestamp: new Date(),
    });

    setNewMessage('');
  };

  const handleDeleteMessage = async (id) => {
    await deleteDoc(doc(db, "messages", id));
  };

  const handleEditMessage = async (id) => {
    if (!editMessageText) return;

    await updateDoc(doc(db, "messages", id), {
      text: editMessageText,
    });

    setEditMessageId(null);
    setEditMessageText('');
  };

  return (
    <div>
      <h2>Chat</h2>
      <div>
        {messages.map((msg) => (
          <div key={msg.id}>
            <strong>{msg.senderId}</strong>: 
            {editMessageId === msg.id ? (
              <input
                type="text"
                value={editMessageText}
                onChange={(e) => setEditMessageText(e.target.value)}
                placeholder="Edit message..."
                required
              />
            ) : (
              <span>{msg.text}</span>
            )}
            <button onClick={() => handleDeleteMessage(msg.id)}>Delete</button>
            {editMessageId === msg.id ? (
              <button onClick={() => handleEditMessage(msg.id)}>Save</button>
            ) : (
              <button onClick={() => {
                setEditMessageId(msg.id);
                setEditMessageText(msg.text);
              }}>Edit</button>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
const handleDeleteMessage = async (id) => {
  await deleteDoc(doc(db, "messages", id));
};
handleDeleteMessage("63558");
export default Chat;
