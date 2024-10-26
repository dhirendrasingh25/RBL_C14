import { Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Loader } from './components/Loader'
import SideBar from './Pages/SideBar/SideBar'
import PageNotFound from './404/PageNotFound'
import Classroom from './Pages/Classrooms/Classroom'
import Events from './Pages/Events/Events'
import DashBoard from './Pages/DashBoard/DashBoard'
import Landing from './Pages/Landing/Landing'
import Labs from './Pages/Labs/Labs'
import LabIncharge from './Pages/LabIncharge/LabIncharge'
import Chat from './Pages/Chat/Chat'

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
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/dashboard"
              element={
                <SideBar>
                  {' '}
                  <DashBoard />{' '}
                </SideBar>
              }
            />
            <Route
              path="/labs"
              element={
                <SideBar>
                  <Labs />{' '}
                </SideBar>
              }
            />
            <Route
              path="/classrooms"
              element={
                <SideBar>
                  <Classroom />{' '}
                </SideBar>
              }
            />
            <Route
              path="/events"
              element={
                <SideBar>
                  <Events />{' '}
                </SideBar>
              }
            />
            <Route
              path="/lab-incharges"
              element={
                <SideBar>
                  <LabIncharge />{' '}
                </SideBar>
              }
            />
            <Route
              path="/messages"
              element={
                <SideBar>
                  <Chat />{' '}
                </SideBar>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  )
}

export default App
