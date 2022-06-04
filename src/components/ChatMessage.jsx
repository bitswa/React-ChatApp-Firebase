

export const ChatMessage = (props) => {
  
  const { text, photoURL, createdAt, name } = props.msg;

  return (
    <div className='c-text_box'>

      <div className='c-image'>
        <img src={photoURL} alt="profile-photo" />
      </div>

      <div className='c-box'>
        <div className='c-name'>
          <span>
            {name}
          </span>
          <span>
            {
            createdAt.toDate().toLocaleTimeString()
            }
          </span>
        </div>
        <div className='c-text'>
          <p>{text}</p>
        </div>
      </div>

    </div>
  )
}
