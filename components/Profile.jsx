import PromptCard from "./PromptCard"

const Profile = ({name,desc, data,handleEdit,handleDelete}) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          {name} Profile
        </span>
      </h1>
      <p className="desc text-left">
        {desc}
      </p>
      <div className="mt-16 prompt_layout">
      {/* The POst data will be available only when page loaded */}
        {data.map((post)=>(
           <PromptCard 
            key={post._id}
            post={post}
            handleEdit={()=>handleEdit && handleEdit(post)}
            // we need to check and makesure that the handleEdit wasn't called reclessly so we use arrowfunction
            handleDelete={()=>handleDelete && handleDelete(post)}
          />)
      )}
    </div>
    </section>
  )
}

export default Profile