import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import NavigationSideBar from './components/navigation/navigationSideBar';
import WindowButton from './components/windowBar/windowButton';

import Home from './pages/home/Home';
import Details from './pages/details/Details';
import Calendar from './pages/calendar/Calendar';

import DataProvider from './store/provider';
import ThemeProvider from './components/theme/theme';

import './App.css';
import "tailwindcss/tailwind.css";
import { Toaster } from './components/ui/toast/toaster';


export default function App() {
  return (
    <DataProvider>
      <ThemeProvider>
        <Router>
          <WindowButton />
          <div className=' bg-zinc50 w-screen h-screen flex flex-row'>
            <NavigationSideBar />
            <main className=' flex-1 max-h-full flex flex-row overflow-x-hidden'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/details' element={<Details />} />
                <Route path='/calendar' element={<Calendar />} />
              </Routes>
            </main>
            <Toaster />
          </div>
        </Router>
      </ThemeProvider>

    </DataProvider>



  );
}
