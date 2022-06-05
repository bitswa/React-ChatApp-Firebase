import { useContext, useEffect, useState, useRef } from 'react';
import { FirebaseContext } from '../../contexts/FirebaseContext';
import { messageRef } from '../../firebase';
import { addDoc, onSnapshot, query, orderBy, limit, serverTimestamp } from 'firebase/firestore';
import { ChatMessage } from '../../components/ChatMessage';

export const Home = () => {

  const { signOut, user } = useContext(FirebaseContext);

  const inputMsg = useRef();
  const dummy = useRef();

  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async(e) => {
    e.preventDefault();

    if(msg === '' || msg.trim() === '') {
      return;
    }

    const { photoURL, displayName } = JSON.parse(user);

    await addDoc(messageRef, {
      text: msg,
      createdAt: serverTimestamp(),
      name: displayName,
      photoURL,
    });

    setMsg('');
    inputMsg.current.focus();
  }

  useEffect(() => {
    const q = query(messageRef, orderBy('createdAt'), limit(100));
    const snap = onSnapshot(q, (snapshot) => {
      setMessages([]);
      snapshot.docs.forEach(doc => {
        setMessages(msg => [...msg, doc.data()])
      })
      dummy.current.scrollInto(dummy.current.scrollHeight); 
    });
  }, [])

  return (
    <div className='c-card'>

      <header className='c-header'>
        <h1>Chat</h1>
        <button onClick={signOut}>Sign out</button>
      </header>

      <div className='c-content'>
        <main className='c-chat'>

          {messages && messages.map((msg, index) => <ChatMessage key={index} msg={msg} />)}

          <div ref={dummy}></div>
        </main>

        <form className='c-form' onSubmit={sendMessage}>
          <input
            ref={inputMsg}
            value={msg}
            placeholder='Type a message...'
            onChange={e => setMsg(e.target.value)}
          />
          <button type='submit'>Send</button>
        </form>
      </div>
    </div>
  )
}