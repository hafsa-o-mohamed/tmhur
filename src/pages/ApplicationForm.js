import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import  { storage } from "..";
import { addDoc, collection, getDocs, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { useNavigate, useParams } from "react-router-dom";
const ApplicationForm = () => {
    const {id} = useParams();
    console.log('this is job id',id)

    const [imageUpload, setImageUpload] = useState();
    const [isEmployer, setIsEmployer] = useState();
    const auth = getAuth();

    const db=getFirestore();
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

    const uploadFile = (e) => {
        e.preventDefault();
        const colRef = collection(db, "applications");

        if (!imageUpload) return;
    
        const imageRef = ref(storage, `9jacoder/images/${imageUpload.name}`);
    
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            console.log(url);
                console.log("tessssssst");
                console.log(e.target.title.value);
            
                addDoc(colRef, {
                    applicantemail:auth.currentUser && auth.currentUser.email,
                    imageid:`9jacoder/images/${imageUpload.name}`,
                  jobid: id,
                  date: Date.now(),
                });
              

            history('/')

          });
        }
        
    );
      };


    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

  return (
    (isEmployer==true) ?
    history('/employer')
    : 

    <div class="flex items-center justify-center">
      <div class="mx-auto w-full max-w-[550px] bg-white">
        <form 
          onSubmit={uploadFile}
          class="py-4 px-9">
          <div class="mb-5">
            <label
              for="email"
              class="mb-3 block text-base font-medium text-[#07074D]"
            >
              البريد الإلكتروني
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="example@domain.com"
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div class="mb-6 pt-4">
            <label class="mb-5 block text-xl font-semibold text-[#07074D]">
              ارفع السيرة الذاتية
            </label>

            <div class="mb-8">
              <input onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
         type="file" name="file" id="file" class="sr-only" />
              <label
                for="file"
                class="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
              >
                <div>
                  <span class="mb-2 block text-xl font-semibold text-[#07074D]">
                    جر واسقط السيرة الذاتية
                  </span>
                  <span class="mb-2 block text-base font-medium text-[#6B7280]">
                    او اضغط هنـا
                  </span>
                  <span class="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                  هنــا

                  </span>
                </div>
              </label>
            </div>

            <div class="mb-5 rounded-md bg-[#F5F7FB] py-4 px-8">
              <div class="flex items-center justify-between">
                <span class="truncate pr-3 text-base font-medium text-[#07074D]">
                  banner-design.png
                </span>
                <button class="text-[#07074D]">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                      fill="currentColor"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div class="rounded-md bg-[#F5F7FB] py-4 px-8">
              <div class="flex items-center justify-between">
                <span class="truncate pr-3 text-base font-medium text-[#07074D]">
                  banner-design.png
                </span>
                <button class="text-[#07074D]">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                      fill="currentColor"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
              <div class="relative mt-5 h-[6px] w-full rounded-lg bg-[#E2E5EF]">
                <div class="absolute left-0 right-0 h-full w-[75%] rounded-lg bg-[#6A64F1]"></div>
              </div>
            </div>
          </div>

          <div>
            <button type="submit" class="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
              قدم الآن
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
