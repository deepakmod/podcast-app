import React, { useEffect } from 'react';
import Signup from './pages/signup-login/Signup';
import { Route , Routes } from 'react-router-dom';
import Login from './pages/signup-login/Login';
import Profile from './pages/Profile/Profile';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { onSnapshot , doc} from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './slices/userSlice';
import Loader from './components/Loader/Loader';
import PrivateRouters from './components/PrivateRouters';
import CreatePodcast from './pages/create-podcast/CreatePodcast';
import Podcasts from './pages/Podcasts/Podcasts';
import PodcastDetails from './pages/podcast-details/PodcastDetails';
import CreateEpisode from './pages/create-episode/CreateEpisode';
import ResetPassword from './pages/reset-password/ResetPassword';
function App() {

  const user = useSelector(state=> state.user.user);
  const dispatch = useDispatch();

  useEffect(()=>{
    const unsubscribeAuth = onAuthStateChanged( auth, (user)=>{
      if(user){
        const unsubscribeSnapshot = onSnapshot(
          doc(db, "users" , user.uid),
          (userDoc)=>{
            if(userDoc.exists()){
              const userData = userDoc.data();
              dispatch(setUser({
                name: userData.name,
                email: userData.email,
                uid: userData.uid,
                profilePicture: userData.profilePicture,
              })
              );
            }
          },
          (error)=>{
            console.error("Error Fetching user data", error);
          }
        );

        return ()=>{
          unsubscribeSnapshot();
        }
      }
    });

    return ()=>{
      unsubscribeAuth();
    }
  },[user]);


  return (
    <div className="App">
      
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/reset_password' element={<ResetPassword />} />
        
        <Route element={<PrivateRouters/>} >
            <Route path='/profile' element={<Profile />} />
            <Route path='/loader' element={<Loader/>} />
            <Route path='/create_podcast' element={<CreatePodcast/>} />
            <Route path='/podcasts' element={<Podcasts />} />
            <Route path='/podcast/:id' element={<PodcastDetails/>} />
            <Route path='/podcast/:id/create_episode' element={<CreateEpisode/>} />
        </Route>
      </Routes>
      <ToastContainer/>
    </div>
  );
}

export default App;
