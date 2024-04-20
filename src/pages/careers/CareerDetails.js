import { useLoaderData, useParams } from "react-router-dom"
import { getFirestore , collection, getDocs ,doc, onSnapshot, getDoc, where , query, DocumentSnapshot} from 'firebase/firestore';
import { useEffect, useState } from "react";

export default function CareerDetails(){

    const {id} = useParams()
    const [career, setCareer] = useState([]);
    useEffect(()=>{
      careersLoader();
    },[])   
    
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
            </div>
        </div>
    )
}
