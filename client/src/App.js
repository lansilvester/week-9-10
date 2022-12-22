import './App.css';

import Login from './components/account/login';
import Home from './components/home/Home';
import Header from './components/header/Header';


import {BrowserRouter, Routes, Route} from 'react-router-dom'
import DataProvider from './context/DataProvider'
import CreatePost from './components/create/CreatePost';

function App() {
  return (
    <DataProvider >
      <BrowserRouter>
      <Header />
        <div style={{marginTop: 65 }}>
        <Routes>
            <Route path='/login' element={<Login />} />        
            <Route path='/' element={<Home />} />        
          </Routes> 
          <Routes>
            <Route path='/create' element={<Login />} />        
            <Route path='/create' element={<CreatePost />} />        
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
