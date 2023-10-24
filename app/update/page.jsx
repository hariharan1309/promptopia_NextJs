'use client'
import { useEffect, useState } from "react"
import { useRouter,useSearchParams } from 'next/navigation'
import Form from "@components/Form"

const update = () => {
  // We dont nee the layout for every folder[router] unless we need some common ui / functionality
      const router = useRouter()
      const [submitting, setSubmitting] = useState(false);
      const [post, setPost]=useState({
        prompt:"",
        tag:""
      });
      const searchParams=useSearchParams();
      const promptId=searchParams.get('id');
      useEffect(()=>{
        const getPrompt=async()=>{
            const res=await fetch(`/api/prompt/${promptId}`);
            const data=await res.json();

            setPost({
                prompt:data.prompt,tag:data.tag
            });
        }
        if(promptId) getPrompt();
      },[promptId])
      const updatePrompt=async(e)=>{
        console.log("Update");
        e.preventDefault();
        setSubmitting(true);
        if(!promptId)
          return alert("Prompt not Found");
        try{
          const data=JSON.stringify({prompt:post.prompt,tag:post.tag});
          const res=await fetch(`/api/prompt/${promptId}`,{
            method:"PATCH",
            body:data
          })
          if (res.ok) {// as we are using createRes on axios we need to use status instead of ok
            router.push('/profile');
          } 
        }
        catch(e){
          console.log(e.message+" Error");
        }
        finally{
          setSubmitting(false);//so the button is enabled again
          setPost({prompt:"",tag:""});
        }
      }
  return (
    <div>

    <Form type="Edit" post={post} setPost={setPost} submitting={submitting} handleSubmit={updatePrompt} />
    </div>
  )
}

export default update;