import Link from 'next/link'
import React from 'react'

const Form = ({type,post,setPost,submitting,handleSubmit}) => {
  return (
    <section className=' w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} post</span>  
      </h1>      
      <p className='desc text-left max-w-md'>
        {type} and share amazing prompts with the world, and let your imagination run wild with any AI-powered platform.
      </p>
      <form 
        onSubmit={handleSubmit}
        className='glassmorphism mt-10 w-full max-w-2xl flex flex-col gap-7'
        >
        <label>
          <span className= "font-satoshi font-semibold text-base text-gray-700">
            Your AI prompt:
          </span>
          <textarea
            value={post.prompt}
            onChange={(e)=>{setPost({...post,prompt:e.target.value})}}
            className='form_textarea'
            placeholder='Write your prompt here...'
            required
            /> 
          
        </label>
        <label>
          <span className= "font-satoshi font-semibold text-base text-gray-700">
            Tag : <span className='font-normal'>(#product,#webdev,#idea)</span>
          </span>
          <input
            value={post.tag}
            onChange={(e)=>setPost({...post,tag:e.target.value})}
            required
            placeholder='#tag'
            className='form_input'
            /> 
        </label>
        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm orange_gradient font-semibold'>
            Cancel
          </Link>
          <button
            type='submit'
            disabled={submitting}
            className="px-5 py-1.5 text-sm rounded-full cursor-pointer bg-gradient-to-br from-orange-500 to-red-500 text-white font-semibold "
          >
            {submitting ? `${type}...`: type}
{/* initially false so the button will be visible and it will show create here on clicking it will submitting will be true and become create... and after handeling the backend part it will become false again  */}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form