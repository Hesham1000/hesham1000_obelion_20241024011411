import React from 'react';
import './RegisterForm.css';
import './LoginForm.css';
import './TaskCreationForm.css';
import './TaskList.css';
import './TaskEditForm.css';
import './Notification.css';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import TaskCreationForm from './TaskCreationForm';
import TaskList from './TaskList';
import TaskEditForm from './TaskEditForm';
import Notification from './Notification';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the Task Management App</h1>
      </header>
      <main>
        <Notification />
        <LoginForm />
        <RegisterForm />
        <TaskCreationForm />
        <TaskList />
        <TaskEditForm />
      </main>
      <footer>
        <p>© 2023 Task Management App</p>
      </footer>
    </div>
  );
}

export default App;
