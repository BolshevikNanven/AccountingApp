import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import NavigationSideBar from './components/Navigation/NavigationSideBar';
import WindowButton from './components/WindowBar/WindowButton';

import Home from './pages/home/Home';

import './App.css';
import "tailwindcss/tailwind.css";


export default function App() {
  return (
    <Router>
      <WindowButton />
      <div className=' bg-gray-50 w-screen h-screen flex flex-row'>
        <NavigationSideBar />
        <main className=' flex-1 max-h-full'>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>


  );
}
