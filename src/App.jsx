import logo from './logo.svg';
import './App.css';
import SideBar from './Components/side-bar/sideBar';
import Main from './Components/main-section/main';
import { TasksProvider } from './context';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);
  return (
    <TasksProvider> {/* Контекст, чтобы любой элемент знал таски */}
      <Main />
      <SideBar />
    </TasksProvider>
  );
}

export default App;
