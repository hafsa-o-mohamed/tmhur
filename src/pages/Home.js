import { useForm } from 'react-hook-form';
import Careers from "./careers/Careers";
import CareerFilters from "./careers/CareerFilters";
import ResultCareers from "./careers/ResultCareers";
import { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import { collection, getDocs, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import DefaultDashboard from './DefaultDashboard';
import EmployerDashboard from '../layouts/EmployerDashboard';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function Home() {

  const auth = getAuth();
  var isAuth = localStorage.getItem("uid");
  const [logedIn, setLogedIn] = useState();
  const [isEmployer, setIsEmployer] = useState();
  const db=getFirestore();
    console.log('auth.currentUser');


    console.log( auth.currentUser && auth.currentUser.email);
    const history = useNavigate();
    onAuthStateChanged(auth, (user) => {
      console.log("user status changed", user);
      checkUserType();
  
    });

    

      const checkUserType = () =>{
        let check =false;
    
        const usersRef = collection(db, "users");
    
        const q =  query(usersRef, where("email", "==", auth.currentUser && auth.currentUser.email));
        console.log(q);
        onSnapshot(q, (snapshot) => {
            snapshot.docs.forEach((doc) => {
                console.log(doc.data().userType);
                ((doc.data().userType)=="employer") ? setIsEmployer(true) :  setIsEmployer(false);
                console.log("this user employing?",isEmployer)
            });
          });
        console.log("done");
    }
     

    return (

      <div>
           {
               
               (isEmployer==true) ?
               history('/employer')
               : <DefaultDashboard />

            }
      </div>
    )
  }
    

