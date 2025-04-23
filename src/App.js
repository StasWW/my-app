import logo from './logo.svg';
import './App.css';
import SideBar from './Components/side-bar/sideBar';
import Main from './Components/main-section/main';
import { TasksProvider } from './context';

function App() {
  return (
    <TasksProvider>
      <Main />
      <SideBar />
      
    </TasksProvider>
  );
}

export default App;
