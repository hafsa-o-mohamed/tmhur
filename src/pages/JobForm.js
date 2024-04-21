import { Form } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDaAfhRAhTXAHtDpG7hcDJnKmZsO6XBpQY",
  authDomain: "job-tmhur.firebaseapp.com",
  projectId: "job-tmhur",
  storageBucket: "job-tmhur.appspot.com",
  messagingSenderId: "988088207240",
  appId: "1:988088207240:web:fa5b8b7f518e997ce25c3d",
};
initializeApp(firebaseConfig);

export default function JobForm() {
  const [isEmployer, setIsEmployer] = useState();
  useEffect(() => {
    isEmployerLoader();
  }, []);

  const isEmployerLoader = async () => {
    const auth = getAuth();
    var user = auth.currentUser;

    console.log(user);

    const db = getFirestore();

    const col = collection(db, "users");
    getDocs(col)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          console.log("****");
          if (doc.data().email.includes(auth.currentUser["email"])) {
            doc.data().userType === "employer"
              ? setIsEmployer(true)
              : setIsEmployer(false);
            console.log(isEmployer);
          }
        });
      })
      .catch((err) => {
        console.log(err.message);
      });

    return isEmployer;
  };

  const db = getFirestore();

  const colRef = collection(db, "jobs");
  const addJob = (e) => {
    console.log("tessssssst");
    console.log(e.target.title.value);

    e.preventDefault();
    addDoc(colRef, {
      title: e.target.title.value,
      discription: e.target.discription.value,
      employmentType: e.target.employmenyType.value,
      salary: e.target.salary.value,
      //employerId: 
      date: Date.now(),
    });
  };

  return (
    <div>
      {isEmployer ? (
        <Form onSubmit={addJob} method="post">
          <div class="mb-5">
            <label
              name="title"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div class="mb-5">
            <label
              name="discription"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Discription
            </label>
            <input
              type="text"
              id="discription"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div class="mb-5">
            <label
              name="employmenyType"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Employment Type
            </label>
            <input
              type="text"
              id="employmenyType"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div class="mb-5">
            <label
              name="salary"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Salary
            </label>
            <input
              type="text"
              id="salary"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <div class="flex items-start mb-5">
            <div class="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                required
              />
            </div>
            <label
              for="remember"
              class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </Form>
      ) : (
        <p>Not an Employer</p>
      )}
    </div>
  );
}
