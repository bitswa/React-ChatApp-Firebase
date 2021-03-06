import { useContext, useEffect, useState, useRef } from 'react';
import { FirebaseContext } from '../../contexts/FirebaseContext';
import { messageRef } from '../../firebase';
import { addDoc, onSnapshot, query, orderBy, limit, serverTimestamp } from 'firebase/firestore';
import { ChatMessage } from '../../components/ChatMessage';
import { EmojiModal } from '../../components/EmojiModal';
import send from '../../images/send-message.png';

export const Home = () => {

  const { signOut, user } = useContext(FirebaseContext);

  const inputMsg = useRef();
  const dummy = useRef();

  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([]);
  const [emojiModal, setEmojiModal] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (msg === '' || msg.trim() === '') {
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
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const q = query(messageRef, orderBy('createdAt'), limit(100));
    const snap = onSnapshot(q, (snapshot) => {
      setMessages([]);
      snapshot.docs.forEach(doc => {
        setMessages(msg => [...msg, doc.data()])
      });
    });
  }, []);

  useEffect(() => {
    dummy.current.scrollIntoView(dummy.current.scrollHeight);
  }, [messages])

  return (
    <div className='c-card'>

      <header className='c-header'>
        <h1>Chat</h1>
        <button onClick={signOut}>Sign out</button>
      </header>

      <div className='c-content'>
        <main className='c-chat'>

          {messages?.map((msg, index) => <ChatMessage key={index} msg={msg} />)}

          <div ref={dummy}></div>
        </main>

        <form className='c-form' onSubmit={sendMessage}>
          <input
            ref={inputMsg}
            value={msg}
            placeholder='Type a message...'
            onChange={e => setMsg(e.target.value)}
          />

          <div className='c-emoji_box'>
            {emojiModal &&
              <EmojiModal setEmojiModal={setEmojiModal} setMsg={setMsg} inputMsg={inputMsg} />}

            <button type='button' className='c-emoji_button' onClick={() => setEmojiModal(!emojiModal)}>??????</button>
          </div>

          <button type='submit' className='c-submit_button'>
            <img src={send} alt='send' />
          </button>
        </form>
      </div>
    </div>
  )
}