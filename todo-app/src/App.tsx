import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';

import {store, persistor} from './state/store';
import CreateTask from './components/CreateTask';
import './styles/App.scss';
import TaskList from './components/TaskList';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <DndProvider backend={HTML5Backend}>
          <div className='App'>
            <main>
              <section className='container'>
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
      </PersistGate>
    </Provider>
  );
}

export default App;
