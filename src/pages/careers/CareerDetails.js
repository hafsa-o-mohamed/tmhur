import { Link, NavLink, useLoaderData, useNavigate, useParams } from "react-router-dom"
import { getFirestore , collection, getDocs ,doc, onSnapshot, getDoc, where , query, DocumentSnapshot} from 'firebase/firestore';
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function CareerDetails(){

    const {id} = useParams()
    const [career, setCareer] = useState([]);
    useEffect(()=>{
      careersLoader();
    },[])   
    
    const [isEmployer, setIsEmployer] = useState();
    const auth = getAuth();
    const history = useNavigate();
    const db=getFirestore();
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

    const careersLoader = async () =>{
        const db= getFirestore();
        const docRef= doc(db,"jobs",id.toString());

    try{
        const docSnap=await getDoc(docRef);
        console.log(docSnap.data())
        setCareer(docSnap.data())

        } catch (error){
          console.error('error fetching Data: ', error)
        }
    
       // const res = await fetch('http://localhost:3000/careers')
       // if (!res.ok){
         //   throw Error ('Could not fetch the careers')
        //}
        //return res.json()
    }
        return(
            
        <div className="career-details">
            <h2> {career.title}</h2>
            <p>الراتب المتوقع :{career.salary} ريال</p>
            <p>الموقع: {career.location}</p>
            <div className="details">

                <p> {career.discription}</p> 

            {
                (isEmployer==true) ?
                <p></p>
                : 
                <Link to="apply">
                <button  class="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
             
              قدم الآن
              
            </button>
            </Link>
            }
            </div>
        </div>
    )
}
