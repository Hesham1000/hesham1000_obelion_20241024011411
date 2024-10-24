import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Notification.js.css';

const Notification = ({ userSettings }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/tasks');
        const tasks = response.data;

        const now = new Date();
        const upcomingNotifications = tasks.filter(task => {
          const dueDate = new Date(task.dueDate);
          const timeDifference = dueDate - now;
          return timeDifference > 0 && timeDifference <= userSettings.notificationTime;
        });

        setNotifications(upcomingNotifications);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
    const interval = setInterval(fetchTasks, 60000);
    return () => clearInterval(interval);
  }, [userSettings]);

  const handleComplete = async (taskId) => {
    try {
      await axios.put(`http://localhost:8000/api/tasks/${taskId}`, {
        completed: true
      });
      setNotifications(notifications.filter(notification => notification.id !== taskId));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="notification-container">
      {notifications.map(notification => (
        <div key={notification.id} className="notification">
          <p className="notification-text">
            Task "{notification.title}" is due on {new Date(notification.dueDate).toLocaleString()}
          </p>
          <button onClick={() => handleComplete(notification.id)} className="complete-button">
            Mark as Completed
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notification;
