"use client";
 
import React, { useState, useEffect } from 'react';
import axios from 'axios' //npm install axios https://www.npmjs.com/package/axios
import Link from "next/link";
import { useParams } from 'next/navigation'
 
export default function ViewUserPage() {
    const {id}=useParams();
 
    console.log(id);
  
    const [userField, setUserField] = useState({
        name: "",
        email: "",
        age:"",
    });
 
    useEffect(()=>{
        fetchUser();
    },[id]);
  
    const fetchUser=async()=>{
        try{
            const result=await axios.get("http://localhost:4000/get/"+id);
            console.log(result.data);
            setUserField(result.data)
  
        }catch(err){
            console.log("Something Wrong");
        }
    }
 
    const changeUserFieldHandler = (e:any) => {
        setUserField({
            ...userField,
            [e.target.name]: e.target.value
        });
        console.log(userField);
    }
      
    const onSubmitChange = async (e:any) => {
        e.preventDefault();
        try {
            await axios.put("http://localhost:4000/update/"+id, userField);
            window.location.href = '/';
        } catch (err) {
            console.log("Something Wrong");
        }
    }
 
    return (
    <div className="max-w-md mx-auto mt-5">
      <h1 className="text-2xl text-center mb-2">Edit Form</h1>
            <form>
                <div className="mb-3 mt-3">
                    <label className="block text-sm font-medium text-gray-900"> ID:</label>
                    <input type="text" id="id" name="id" value={id} disabled />
                </div>
                <div className="mb-3 mt-3">
                    <label className="block text-sm font-medium text-gray-900"> Full Name:</label>
                    <input type="text" className="input input-bordered input-primary w-full max-w-xs" placeholder="Enter Your Full Name" name="name" value={userField.name} onChange={e => changeUserFieldHandler(e)} />
                </div>
                <div className="mb-3 mt-3">
                    <label className="block text-sm font-medium text-gray-900">Email:</label>
                    <input type="email" className="input input-bordered input-primary w-full max-w-xs" id="email" placeholder="Enter email" name="email" value={userField.email}  onChange={e => changeUserFieldHandler(e)}/>
                </div>
                <div className="mb-3 mt-3">
                     <label className="block text-sm font-medium text-gray-900">Age:</label>
                      <input type="text" className="input input-bordered input-primary w-full max-w-xs" id="age" placeholder="Enter age" name="age" value={userField.age} onChange={e => changeUserFieldHandler(e)} required/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={e=>onSubmitChange(e)}>Update</button>
            </form>
    </div>
  );
}