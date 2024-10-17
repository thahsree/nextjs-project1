'use client'

import { useEffect, useState } from 'react';
import PromptCard from "./PromptCard";


function Feed(props) {
    const [searchText , setSearchText] = useState("");
    const [posts , setPosts] = useState([])
    const handleSearchText =()=>{}

    const PromptCardList = ({data , handleTagClick})=>{
        return(
            <div className='mt-16 prompt_layout'>
                {
                    data.map((post)=> (
                        <PromptCard 
                            key={post._id}
                            post={post}
                            handleTagClick={handleTagClick}
                        />
                    ))
                }
            </div>
        )
    }

    useEffect(()=>{
        const fetchPost = async()=>{
            const response = await fetch('/api/prompt')
            const data = await response.json()

            setPosts(data)
        }

        fetchPost();
    },[])


    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input 
                type="text" 
                placeholder='search for a prompt' 
                value={searchText}
                onChange={handleSearchText}
                required
                className='search_input peer'
                />
            </form>
            <PromptCardList
             data={posts}
             handleTagClick={()=>{}}

            />
        </section>
    );
}

export default Feed;