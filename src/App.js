import logo from './logo.svg';
import './App.css';
import SideBar from './Components/side-bar/sideBar';
import Main from './Components/main-section/main';

function App() {
  return (
    <>
      <SideBar />
      <Main />
      {/* Description must not be added hear*/}
      {/* Description must be Main's child*/}
    </>
  );
}

export default App;
