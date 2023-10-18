import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import NavigationSideBar from './components/navigation/navigationSideBar';
import WindowButton from './components/windowBar/windowButton';

import Home from './pages/home/Home';
import Details from './pages/details/Details';
import Calendar from './pages/calendar/Calendar';

import './App.css';
import "tailwindcss/tailwind.css";


export default function App() {
  return (
    <Router>
      <WindowButton />
      <div className=' bg-gray-50 w-screen h-screen flex flex-row'>
        <NavigationSideBar />
        <main className=' flex-1 max-h-full flex flex-row'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/details' element={<Details />} />
            <Route path='/calendar' element={<Calendar />} />
          </Routes>
        </main>
      </div>
    </Router>


  );
}
