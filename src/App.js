import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Profiles from './Components/ProfileList/Profiles';
import SignUp from './Components/SignUp/Signup';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<SignUp />} />
          <Route path='/signup' element={<Profiles />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
