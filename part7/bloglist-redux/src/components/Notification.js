import { notificationStatus } from '../reducers/notificationReducer';
import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';

function Notification() {
  const { message, status } = useSelector((state) => state.notification);

  if (message === '') {
    return null;
  }

  return (
    <>
      <Alert variant={status} className={status}>
        {message}
      </Alert>
      <br />
    </>
  );
}

export { Notification };
