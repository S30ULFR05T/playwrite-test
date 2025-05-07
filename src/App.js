import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Profiles from './Components/ProfileList/Profiles';
import SignUp from './Components/SignUp/Signup';
import Signup from './Components/SignUp/Signup';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Profiles />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path="/signup/:id" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
