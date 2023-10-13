import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import CreateTask from './components/CreateTask';
import './styles/App.scss';
import TaskList from './components/TaskList';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
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
    </DndProvider>
  );
}

export default App;
