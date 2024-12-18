import React,{ useEffect,useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import CandidateDashboard from './Components/Candidate_Dashboard';
import AdminDashboard from './Components/Admin_Dashboard';
import ProjectDetails from './Components/ProjectDetails';
//import TaskList from './Components/TaskList';
//import ProjectModal from './Components/ProjectModal';
// import Dashboard from './Components/Dashboard';
// import CreateForm from './Components/CreateForm';
// import FormSubmissions from './Components/FormSubmissions';
// import FormDetails from './Components/FormDetails';
// import FormInteraction from './Components/FormInteraction';
 import Layout from './Layout'; // Import the Layout component
 import HomePage from './Components/HomePage';
import HomeLayout from './HomeLayout';
const AllRoutes = () => {

  const[user,setUser]=useState(null);
  useEffect(
    ()=>{
      const storedUser=JSON.parse(localStorage.getItem('user'))
      if(storedUser){
        setUser(storedUser)
      }
    },[]
  )

  return (
    <Routes>
      {/* Wrap all routes inside the Layout component */}
      <Route path='/' element={<HomeLayout><HomePage/></HomeLayout>}/>
      <Route path="/login" element={<HomeLayout><Login /></HomeLayout>} />
      <Route path="/register" element={<HomeLayout><Register  /></HomeLayout>} />
   
    <Route path="/candidate-dashboard" element={<Layout><CandidateDashboard/></Layout>}/>
    <Route path="/admin-dashboard" element={<Layout><AdminDashboard/></Layout>}/>
    <Route path="/projects/:projectId" element={<Layout><ProjectDetails /></Layout>} />
    </Routes>
  );
};

export default AllRoutes;
