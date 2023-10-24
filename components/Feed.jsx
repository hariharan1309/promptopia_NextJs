'use client'
import {useState,useEffect} from 'react';
import PromptCard from './PromptCard';

// The PromptCardList will be used only within the feed so we are creating it here
const PromptCardList=({data,handleTagClick})=>{
  return(
    <div className="mt-16 prompt_layout">
        {data.map((post)=>(
           <PromptCard 
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />)
      )}
    </div>
  )
}
const Feed = () => {
  const [searchText,setSearchText]=useState(' ');
  const [posts,setPosts]=useState([]);
  const [filteredPosts,setFilteredPosts]=useState([]);
  useEffect(()=>{
    handleSearch();
  },[searchText]);

  const handleSearch=async()=>{
    if(searchText.trim()!==''){
      const searchPosts=posts.filter((post)=>(
        post.prompt.toLowerCase().includes(searchText.trim().toLowerCase()) 
        || post.tag.toLowerCase().includes(searchText.trim().toLowerCase()) 
        || post.creator.username.toLowerCase().includes(searchText.trim().toLowerCase()) 
      ))
      setFilteredPosts(searchPosts);
    }
    else{
      setFilteredPosts(posts);
    }
  }
  useEffect(()=>{
    const fetchPost=async()=>{
      const response=await fetch("/api/prompt");
      const data=await response.json();
      setPosts(data);
      setFilteredPosts(data);
    }
    fetchPost();

  },[])
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
          <input 
            type='text'
            placeholder='search by a prompt or tag or user'
            value={searchText}
            onChange={(e)=>setSearchText(e.target.value)}
            required
            className="search_input peer border-none"
          />
      </form>
      <PromptCardList 
        data={filteredPosts}
        handleTagClick={setSearchText}
      />
    </section>
  )
}

export default Feed;