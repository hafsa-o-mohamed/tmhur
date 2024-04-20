import { getAuth, createUserWithEmailAndPassword,signOut

} from 'firebase/auth';
import  { Navigate } from 'react-router-dom'

const LogOut = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    signOut(auth).then(()=>{
        console.log('signedOut')
    }).catch((err)=>{
        console.log(err.message)
    })
    return <Navigate to='/'  />
}
 
export default LogOut;