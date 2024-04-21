import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import ResultCareers from "./ResultCareers";
import { Link } from "react-router-dom";

const EmployerCareers = () => {

  const [jobs,setJobs] = useState([]);

  useEffect(() => {
    resultsLoader(auth.currentUser && auth.currentUser.email);
  }, []);

  const db=getFirestore();
  const colRef = collection(db,'jobs');
  const auth = getAuth();
  const user = auth.currentUser;

  onAuthStateChanged(auth, (user) => {
    console.log("user status changed", user);

  });


  const resultsLoader =(email) =>{
        console.log('employer in ')
        const j = []

        getDocs(colRef).then((snapshot)=>{
          snapshot.docs.forEach((doc)=>{
            console.log('****');
            if((doc.data().employerId)==(email) ){
              console.log('includes');
              j.push({...doc.data(),id:doc.id})
    
            }
    
          })
          setJobs(j);
        }).catch (err=>{
          console.log(err.message)
        });
        
        //e.target.search.value
    
    
      }
    return ( 
   <div>
 {(jobs.length>=0)? 
             
              
<ResultCareers jobs={jobs}/> 
 :   <p>You Didnt Post any job yet</p>}
    </div>
     )
}
 
export default EmployerCareers;