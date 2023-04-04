import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { userInfo } from './services/userService';

import './index.css';

import EditTrail from './pages/trails/Edit';
import IndexTrail from './pages/trails/Index';
import NewTrail from './pages/trails/New';
import ShowTrail from './pages/trails/Show';
import EditComment from './pages/comments/Edit';

import Register from './users/Register';
import Login from './users/Login';
import Navbar from './components/Navbar';
import MapChart from './pages/map/Map';

function App() {

  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
      
      let token = localStorage.getItem("token")

      if (token) {
          getLoggedInUser()
      } else {
          setIsLoading(false)
      }

      async function getLoggedInUser() {
          const user = await userInfo()
          setUser(user)
          setIsLoading(false)
      }

  }, [])

  let loggedIn = user.username

  return (
    <div className="App">
      <Navbar user={loggedIn} setUser={setUser} />
      <Routes>
          <Route path='/trails' element={<IndexTrail user={loggedIn} />} />
          <Route path='/trails/:id' element={<ShowTrail user={loggedIn} />} />
          <Route path='/trails/map' element={<MapChart user={loggedIn} />} />
          {loggedIn ?
            <>
              <Route path='/trails/new' element={<NewTrail user={loggedIn} />} />
              <Route path='/trails/:id/edit' element={<EditTrail />} />
              <Route path='/trails/:id/comments/:cid' element={<EditComment />} />
              {!isLoading && <Route path='*' element={<Navigate to='/trails' />} />}
            </>
            :
            <>
              <Route path='/register' element={<Register setUser={setUser} />} />
              <Route path='/login' element={<Login setUser={setUser} />} />
              {!isLoading && <Route path='*' element={<Navigate to='/login' />} />}
            </>
        } 
      </Routes>
    </div>
  );
}

export default App;
