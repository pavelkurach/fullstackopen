import { createContext, useContext, useReducer } from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload;
    case 'CLEAR_NOTIFICATION':
      return '';
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, dispatch] = useReducer(notificationReducer, '');

  const setNotification = (message) => {
    dispatch({ type: 'SET_NOTIFICATION', payload: message });
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' });
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;

export const useSetNotification = () => {
  const notificationContext = useContext(NotificationContext);
  return (message) => notificationContext.setNotification(message);
};

export const useNotification = () => {
  const notificationContext = useContext(NotificationContext);
  return notificationContext.notification;
};
