import { useContext, useEffect, useState, useRef } from 'react';
import { FirebaseContext } from '../../contexts/FirebaseContext';
import { db } from '../../firebase';
import { addDoc, onSnapshot, query, orderBy, limit, serverTimestamp, collection } from 'firebase/firestore';
import './style.css';
import { ChatMessage } from '../../components/ChatMessage';

export const Home = () => {

  const { signOut, user } = useContext(FirebaseContext);

  const [json, setJson] = useState(null)

  useEffect(() => {
    if (JSON.stringify(user)) {
      setJson(JSON.parse(user))
    }
  }, [user])

  const messageRef = collection(db, 'messages');

  const inputMsg = useRef();
  const dummy = useRef();
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async(e) => {
    e.preventDefault();

    if(msg === '' || msg.trim() === '') {
      return;
    }

    await addDoc(messageRef, {
      text: msg,
      name: json.displayName,
      createdAt: serverTimestamp(),
      photoURL: json.photoURL,
    })

    setMsg('');
    inputMsg.current.focus();
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    const q = query(messageRef, orderBy('createdAt'), limit(25));
    const snap = onSnapshot(q, (snapshot) => {
      setMessages([]);
      snapshot.docs.forEach(doc => {
        setMessages(msg => [...msg, doc.data()])
      })
    });
  }, [])

  return (
    <div className='c-card'>
      <header className='c-header'>
        <h1>Welcome</h1>
        <button onClick={signOut}>Sign out</button>
      </header>
      <main className='c-chat'>
          { messages && messages.map((msg, index) => <ChatMessage key={index} msg={msg} index={index} />)
          }
          <div ref={dummy}></div>
      </main>
        <form className='c-form' onSubmit={sendMessage}>
          <input
            ref={inputMsg}
            value={msg}
            onChange={e => setMsg(e.target.value)}
          />
          <button
            type='submit'
            onClick={sendMessage}
          >Send
          </button>
        </form>
    </div>
  )
}