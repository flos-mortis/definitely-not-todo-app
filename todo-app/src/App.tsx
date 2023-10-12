import React from 'react';

import CreateTask from './components/CreateTask';
import './styles/App.scss';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className='App'>
      <main>
        <section className='container'>
          <input placeholder='Search'/>
          <div className='todo-main'>
            <TaskList title='Queue'/>
            <TaskList title='Development' />
            <TaskList title='Done' />
          </div>
          <CreateTask/>
        </section>
      </main>
    </div>
  );
}

export default App;
