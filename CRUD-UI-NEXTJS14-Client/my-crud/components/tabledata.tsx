"use client";
   
import React, { useEffect, useState } from "react";
import axios from 'axios' //npm install axios https://www.npmjs.com/package/axios
import Link from "next/link";
 
export default function Users() {
    const [userData, setUSerData] = useState([]);
    useEffect(() => {
        fetchData();
    }, [])
  
    const fetchData = async () => {
        try {
            const result = await axios("http://localhost:4000/");
            console.log(result.data);
            setUSerData(result.data)
        } catch (err) {
            console.log("somthing Wrong");
        }
    }
 
    const handleDelete=async(id:any)=>{
        console.log(id);
        await axios.delete("http://localhost:4000/deleteuser/"+id);
        const newUserData=userData.filter((item:any)=>{
            return(
                item._id !==id
            )
        })
        setUSerData(newUserData);
    }
  return (
        <table className="table table-zebra">
        <thead className="text-sm text-gray-700 uppercase bg-gray-50">
            <tr>
            <th className="py-3 px-6">#</th>
            <th className="py-3 px-6">Name</th>
            <th className="py-3 px-6">Email</th>
            <th className="py-3 px-6">Age</th>
            <th className="py-3 px-6 text-center">Actions</th>
            </tr>
        </thead>
        <tbody>
            {userData.map((rs:any, index) => (
            <tr key={rs.id} className="bg-white border-b">
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{rs.name}</td>
                <td className="py-3 px-6">{rs.email}</td>
                <td className="py-3 px-6">{rs.age}</td>
                <td className="flex justify-center gap-1 py-3">
                    <Link
                    href={`/user/view/${rs._id}`} 
                    className="btn btn-info">
                    View
                    </Link>
                    <Link
                    href={`/user/edit/${rs._id}`} 
                    className="btn btn-primary">
                    Edit
                    </Link>
                    <button onClick={()=>handleDelete(rs._id)} className="btn btn-secondary">Delete</button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
  );
}