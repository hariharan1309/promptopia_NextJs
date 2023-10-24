'use client'
import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import Form from "@components/Form"
import axios from "axios";
const page = () => {
  // We dont nee the layout for every folder[router] unless we need some common ui / functionality
      const {data:session}=useSession();
      // get the data property from session and assign it to session variable
      const router = useRouter()
      const [submitting, setSubmitting] = useState(false);
      const [post, setPost]=useState({
        prompt:"",
        tag:""
      });
      const createPrompt=async(e)=>{
        e.preventDefault();
        setSubmitting(true);// will make the button disabled until saved on DB
        try{
          const body=JSON.stringify({prompt:post.prompt,userId:session?.user.id,tag:post.tag});
          // post data with userId
          const createRes= await axios.post(`/api/prompt/new`,body);
          // It will directly redirect to http://localhost:3000/api/prompt/new if the post is created
          if (createRes.status==201) {// as we are using createRes on axios we need to use status instead of ok
            router.push('/');
          } 
        }
        catch(e){
          console.log(e.message);
        }
        finally{
          setSubmitting(false);//so the button is enabled again
          setPost({prompt:"",tag:""});
        }
      }
  return (
    <div>
        <Form type="Create" post={post} setPost={setPost} submitting={submitting} handleSubmit={createPrompt} />
    </div>
  )
}

export default page