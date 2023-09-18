// You can place invisible elements on your page that only bots would interact with.
// If interaction is detected, you can be fairly certain it's a bot.
const Honeypot = () => {
  const handleFocus = () => {
    window.location.href = 'https://www.google.com';
  };

  return <input type='text' style={{ display: 'none' }} onFocus={handleFocus} aria-hidden='true' tabIndex={-1} />;
};

export default Honeypot;
