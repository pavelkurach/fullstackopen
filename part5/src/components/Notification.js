const notificationStatus = {
  SUCCESS: 'success',
  ERROR: 'error',
};

function Notification({ message, status }) {
  if (!message) {
    return null;
  }

  let color;

  if (status === notificationStatus.SUCCESS) {
    color = 'green';
  } else if (status === notificationStatus.ERROR) {
    color = 'red';
  }

  const style = {
    fontSize: 16,
    color,
    backgroundColor: 'lightgrey',
    padding: '8px',
    border: `2px solid ${color}`,
    borderRadius: '8px',
  };

  return (
    <>
      <div style={style} className={status}>
        {message}
      </div>
      <br />
    </>
  );
}

export { Notification, notificationStatus };
