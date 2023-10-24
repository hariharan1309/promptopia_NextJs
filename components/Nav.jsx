"use client";
import Image from "next/image"
import Link from "next/link"
import { useState,useEffect } from "react"
import {signIn,signOut,useSession,getProviders} from 'next-auth/react';
const Nav = () => {
  const {data:session}=useSession();
  const [providers,setProviders]=useState(null);
  const [dropDown,setDropDown]=useState(true);

  // Getting Providers from google for next app
  useEffect(()=>{
    const setUpProviders=async ()=>{
      const response = await getProviders();
      setProviders(response);
    }
    setUpProviders();
    console.log(status);
  },[]);
  
  return (
    <nav className="flex-between w-full mb-15 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image  src="/assets/images/logo.svg" alt="Logo"  width={30} height={30} className="object-contain"/>
        <p className="logo_text">Promptopia</p>
      </Link>
      {/* Desktop Nav */}
      <div className="sm:flex hidden">
        {/* max-md means flex will be applied from small upto md , while md means from large upto md*/}
          {session?.user ?
           (
            <div className="flex gap-3 md:gap-5">
                <Link href="/create " className="black_btn">Create</Link>
                  <button type="button" onClick={signOut} className="outline_btn">
                    <a href="/">sign out</a>
                  </button>
                <Link href="/profile">
                  <Image  src={session?.user.image} alt="profile"  width={30} height={30} className="object-contain rounded-full cursor-pointer"/>
                </Link>
            </div>
            ):
            (
            <>
              {providers && 
              Object.values(providers).map((provider)=>(
                <button type="button" key="provider.name" onClick={()=>signIn(provider.id)} className="black_btn">
                  Sign In
                </button>
              ))}
            </>
            ) 
          }
      </div>
      {/* {alert(providers)} */}
       
      {/* Mobile Nave */}
        <div className="sm:hidden flex relative">
            {session?.user ?
            (
              <div className="flex">
                  <Image  
                    src={session?.user.image} 
                    alt="profile"  width={30} height={30} className="object-contain rounded-full cursor-pointer"
                    onClick={()=>setDropDown((prev)=>!prev)}
                    // ()=>setDropDown(!dropDown) it is not recommended
                  />
                  { dropDown &&
                  (
                    <div className="dropdown">
                      <Link href="/profile" className="drop_link hover:text-slate-500" onClick={()=>setDropDown(false)}>
                        My Profile
                      </Link>
                      <Link href="/create" className="drop_link hover:text-slate-500" onClick={()=>setDropDown(false)}>
                        New Prompt
                      </Link>
                      <button type="button" onClick={()=>{setDropDown(false); signOut() }} className=" mt-5 w-full black_btn">sign out</button>

                    </div>
                  )
                  }
              </div>
            )
            :
            (
              <>
                {providers && 
                Object.values(providers).map((provider)=>(
                  <button type="button" key="provider.name" onClick={()=>signIn(provider.id)} className="black_btn">
                    Sign In
                  </button>
                ))
                }
              </>
            )}
        </div>
    </nav>
  )
}

export default Nav