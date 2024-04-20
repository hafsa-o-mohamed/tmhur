import { Link } from "react-router-dom";

export default function ResultCareers(jobs){
    console.log("hiiiii");
const res=jobs["jobs"];




    return(
        <div>
            <div className="p-10 flex flex-col">
            {res.map(career => (
                <div className=' m-6 p-6 rounded-md ring ring-blue-700'>

                <Link to = {career.id.toString()} key={career.id}>
                    <h1 className='font-bold text-2xl'>{career.title}</h1>
                    <div className='my-1 flex items-center '>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-red-600 w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>

                       <p>{career.location}</p>
                       </div>

                    {/* <p> {career.discription}</p> */}

                </Link>
                </div>

            )
                )}
          </div>
           
            
        </div>
    )
}
 
