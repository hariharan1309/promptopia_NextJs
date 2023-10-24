'use client'

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
// useSession used to check if user is logged in
import Profile from "@components/Profile"
const MyProfile = () => {
  // The profile can be own user profile or another user's profile 
  const {data:session}=useSession();
  const [posts,setPosts]=useState([]);
  const searchParams=useSearchParams();
  const router=useRouter();
  const guest=searchParams.has('id');
  const profile={
    n1:"My",
    n2:"your",
    id:session?.user.id
  }
  if(guest && session?.user.id!==searchParams.get("id")){
    profile.n1=searchParams.get("name");
    profile.n2=searchParams.get("name")+ "'s";
    profile.id=searchParams.get("id");
    console.log("Others Profile")
  }
  else{
    console.log("Same Profile")
  }
  const handleEdit=(post)=>{
    console.log("Edit Clicked")
    router.push(`/update?id=${post._id}`);
  }

  const handleDelete=async(post)=>{
    const isConfirm=confirm("Are you sure wanna delete ?");
    if(isConfirm){
      try {
        await fetch(`api/prompt/${post._id.toString()}`,{
          method:'DELETE',
        })
        const filterPost= posts.filter((p)=>{
          post._id!==p._id
        })
        setPosts(filterPost);
        router.reload();
      } catch (error) {
        console.log(error.message)
      }
    }
  }
  useEffect(()=>{
    const fetchPost=async()=>{
      const response=await fetch(`/api/user/${profile.id}/posts`);
      const data=await response.json();
      setPosts(data);
    }
    if(session?.user.id){
      fetchPost();
    }
    else{
      console.log("Login You idiot")
    }
  },[])
  return (
    <div>
      <Profile 
        name={profile.n1}
        desc={"Welcome to "+profile.n2+" personalized profile page!"}
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  )
}
export default MyProfile;