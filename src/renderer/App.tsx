import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import NavigationSideBar from './components/navigation/navigationSideBar';
import WindowButton from './components/windowBar/windowButton';

import HomePage from './pages/home/home';
import DetailsPage from './pages/details/details';
import CalendarPage from './pages/calendar/calendar';
import LedgerPage from './pages/ledger/ledger';
import SettingPage from './pages/setting/setting';

import DataProvider from './store/provider/data-provider';
import ThemeProvider from './components/theme/theme';

import './App.css';
import './calendar.css'
import "tailwindcss/tailwind.css";
import { Toaster } from './components/ui/toast/toaster';
import { StateProvider } from './store/provider/state-provider';


export default function App() {
  return (
    <DataProvider>
      <StateProvider>
        <ThemeProvider>
          <Router>
            <WindowButton />
            <div className=' bg-zinc50 w-screen h-screen flex flex-row'>
              <NavigationSideBar />
              <main className=' flex-1 max-h-full flex flex-row overflow-x-hidden'>
                <Routes>
                  <Route path='/' element={<HomePage />} />
                  <Route path='/details' element={<DetailsPage />} />
                  <Route path='/calendar' element={<CalendarPage />} />
                  <Route path='/books' element={<LedgerPage />} />
                  <Route path='/settings/*' element={<SettingPage />} />
                </Routes>
              </main>
              <Toaster />
            </div>
          </Router>
        </ThemeProvider>
      </StateProvider>


    </DataProvider>



  );
}
