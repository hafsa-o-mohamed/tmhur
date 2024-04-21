import { useForm } from 'react-hook-form';
import Careers from "./careers/Careers";
import CareerFilters from "./careers/CareerFilters";
import { getFirestore , collection,getDocs , onSnapshot} from 'firebase/firestore';
import ResultCareers from "./careers/ResultCareers";
import { useState } from 'react';

export default function DefaultDashboard() {
  const [jobs,setJobs] = useState([]);
   
  const db=getFirestore();
  const colRef = collection(db,'jobs');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const resultsLoader =(e) =>{
    e.preventDefault()
        console.log('careers in home')
        const j = []
    

        getDocs(colRef).then((snapshot)=>{
          snapshot.docs.forEach((doc)=>{
            console.log('****');
            if((doc.data().title).includes(e.target.search.value) ){
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
      <div className="home">
       
  <div
    class="relative overflow-hidden bg-cover bg-no-repeat bg-[50%] bg-[url('https://tecdn.b-cdn.net/img/new/textures/full/142.jpg')] h-[500px]">
  </div>

  <div class="w-100 mx-auto px-6 sm:max-w-2xl md:max-w-3xl md:px-12 lg:max-w-5xl xl:max-w-7xl xl:px-32">
    <div class="text-center">
      <div
        class="block rounded-lg bg-[hsla(0,0%,100%,0.55)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-[hsla(0,0%,5%,0.55)] dark:shadow-black/20 md:py-16 md:px-12 mt-[-170px] backdrop-blur-[30px]">
        <h1 class="mt-2 mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl">
          The best offer on the market <br /><span class="text-primary">for your business</span>
        </h1>

        <form onSubmit={resultsLoader} method="post" class="max-w-md mx-auto">   
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input name="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
        <input type="hidden" name="_action" value="Filter"></input>
        <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        
    </div>
</form>
              </div>
    </div>
  </div>      
  
              {(jobs.length>0 ) ? <ResultCareers jobs={jobs}/>:   <Careers />
 }

  
  </div>
    )
  }
    

