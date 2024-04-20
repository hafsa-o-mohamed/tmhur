import { createBrowserRouter , Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import RootLayout from './layouts/RootLayout';
import HelpLayout from './layouts/HelpLayout';
import Faq from './pages/help/Faq';
import Contact, { contactAction } from './pages/help/Contact';
import NotFound from './pages/NotFound';
import Careers, { careersLoader } from './pages/careers/Careers';
import CareersLayout from './layouts/CareersLayout';
import CareerDetails from './pages/careers/CareerDetails';
import CareersError from './pages/careers/CareersError';
import JobForm from './pages/JobForm';
import React from 'react';
import CareerFilters from './pages/careers/CareerFilters';
import SignUp from './pages/SignUp';
import LogOut from './pages/LogOut';
import LogIn from './pages/LogIn';



const router = createBrowserRouter(

  createRoutesFromElements(
    <Route path ="/" element = {<RootLayout/>}>
      <Route index element ={<Home/>}  />
          <Route
          path =":id"
          element={<CareerDetails/>}
          />
          
        <Route path = "signup" element ={<SignUp/>}/> 
        <Route path = "logout" element ={<LogOut/>}/> 
        <Route path = "login" element ={<LogIn/>}/> 

        <Route path = "about" element ={<About/>}/> 
        <Route path="addjob" element= {<JobForm/>}
        />
        <Route path = "help" element = {<HelpLayout/>}>
          <Route path='faq' element= {<Faq/>}/>
          <Route path='contact' element= {<Contact/>} action={contactAction}/>
        </Route>
        <Route path ="careers" element={<CareersLayout/>} errorElement={<CareersError/>}>
          <Route 
          index 
          element={<Careers />}
          />
          <Route 
          path='filters' 
          element={<CareerFilters />}
          />
          <Route
          path =":id"
          element={<CareerDetails/>}
          />
        </Route>

      <Route path='*' element={<NotFound/>}/>
    </Route>
  )
)

function App() {
  return (

    <RouterProvider router ={router}/>
  );
}

export default App