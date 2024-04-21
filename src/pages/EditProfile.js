import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore, onSnapshot, query, where } from "firebase/firestore";

const EditProfile = () => {
    const auth = getAuth();
    const db=getFirestore();
    var isAuth = localStorage.getItem("uid");
    const [logedIn, setLogedIn] = useState();
    const [isEmployer, setIsEmployer] = useState();



    useEffect(()=>{
        checkUserType();
    },[])   
      
    onAuthStateChanged(auth, (user) => {
      console.log("user status changed", user);
      isAuth = localStorage.getItem("uid");
      setLogedIn(isAuth);
            checkUserType()    ;
    });
  
    
    const checkUserType=()=>{
        let check =false;

        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", auth.currentUser["email"]));
        onSnapshot(q, (snapshot) => {
            snapshot.docs.forEach((doc) => {
                ((doc.data().userType)==='employer') ? setIsEmployer(true) :  setIsEmployer(false);
                console.log("this user employing?",check)
            });
          });
        console.log("done");
    }


    return ( 
        <div>
            {
               
               (logedIn) ?
               (isEmployer=="true") ?
                <p>Employer Edit</p>
                  : <p>Employee Edit</p> 
                :  <p>You Are Not Authorized</p>

            }
            
        </div>
     );
}
 
export default EditProfile;
