import {  BrowserRouter as Router,Link, Route, Routes,Outlet } from 'react-router-dom';
import './App.css';
import Homepage from './component/detail'; 
import Navbar from './component/navbar';
import Create from './component/creat';
import logo from './icon/cat.jpg';


function App() {
  return (
    <Router>
    <div>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Homepage' element={<Homepage />}/>
          <Route path='/Create' element={<Create/>}/>
        </Routes>
      
    </div>
    </Router>
  );
}

function Home() {
  return(
    <div>
       <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Link to="/Homepage" style={{textDecoration:'none'}}>ꕀ .*   ✴︎  Click to Detail • ·̭ •̥    ✿  𖠚ᐝ</Link>
      </header>
      <Outlet />
    </div>
  )
}

export default App;
