import {NavLink, Outlet } from "react-router-dom";
import { getFirestore , collection,getDocs , onSnapshot} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function EmployerDashboard(){
  useEffect(() => {
    resultsLoader(auth.currentUser && auth.currentUser.email);
  }, []);

    const [jobs,setJobs] = useState([]);
    const auth = getAuth();
    const db=getFirestore();
    const colRef = collection(db,'jobs');
    

  onAuthStateChanged(auth, (user) => {
    console.log("user status changed", user);


  });
 
      const isEmployerLoader = async () => {
        var isAuth = localStorage.getItem("uid");
        var user = auth.currentUser;
        console.log('this is user id');

        console.log(user);
    
      };

    const resultsLoader =(useremail) =>{
        
            console.log('this is user id');
            const user = auth.currentUser;

            console.log(user);
            //e.target.search.value
        
        
          }
    return(
        
<div className="m-10">
<div class="sm:hidden">
    <label for="tabs" class="sr-only">Select your country</label>
    <select id="tabs" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option>الوظائف</option>
        <option>المتقدمين</option>
        <option>استعرض الموظفين المحتملين</option>

    </select>
</div>
<ul class="hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
    <li class="w-full focus-within:z-10">
    <NavLink to="employercareers"  class="inline-block w-full p-4 text-gray-900 bg-gray-100 border-r border-gray-200 dark:border-gray-700 rounded-s-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white">الوظائف</NavLink>

    </li>
    <li class="w-full focus-within:z-10">
    <NavLink to="applicants"  class="inline-block w-full p-4 text-gray-900 bg-gray-100 border-r border-gray-200 dark:border-gray-700 rounded-s-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white">
      المتقدمين

    </NavLink>
    </li>
    <li class="w-full focus-within:z-10">
    <NavLink to="employercareers"  class="inline-block w-full p-4 text-gray-900 bg-gray-100 border-r border-gray-200 dark:border-gray-700 rounded-s-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white">استعرض الموظفين المحتملين</NavLink>
    </li>

</ul>


  <Outlet/>



</div>



    )

}