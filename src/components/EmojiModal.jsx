export const EmojiModal = (props) => {

  const { setMsg, setEmojiModal, inputMsg } = props;

  const emojis = [
    '👍', '🖖', '🤘',
    '👌', '😎', '🤣',
    '🤖', '👻', '🤡',
  ];

  const handleClick = (e) => {
    const emoji = e.target.innerHTML;
    setMsg(msg => msg + emoji);
    setEmojiModal(false);
    inputMsg.current.focus();
  };

  return (
    <div className="c-emoji_modal">
      {emojis.map(e =>
        <span key={e} onClick={(e) => handleClick(e)}>{e}</span>
      )}
    </div>
  );
}