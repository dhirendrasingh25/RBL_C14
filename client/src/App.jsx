
import { lazy, Suspense ,useEffect } from "react";
import {
  BrowserRouter as Router ,Routes , Route
} from "react-router-dom";
import { Loader } from './components/Loader';
import SideBar from './Pages/SideBar/SideBar';
import PageNotFound from "./404/PageNotFound";


const DashBoard= lazy(()=> import("./Pages/DashBoard/DashBoard"));
const Landing= lazy(()=> import("./Pages/Landing/Landing"));


function App() {
  // const storedUser = JSON.parse(localStorage.getItem("user"));
  // const userId = storedUser?._id;
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   // console.log("efe");
  //   // console.log(userId);
  //   if (userId) {
  //     dispatch(getProfileDetails(userId));
  //     dispatch(loginUser(storedUser));
  //   }
  // }, [dispatch, userId]);

  return (
    <>
      <Router>
      <Suspense fallback={<Loader/>}> 
        <Routes>
          <Route path="/" element={ <Landing/>} />
          <Route path="/dashboard" element={<SideBar> <DashBoard/> </SideBar>} />
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
      </Suspense>
      </Router>
    </>
  )
}

export default App
