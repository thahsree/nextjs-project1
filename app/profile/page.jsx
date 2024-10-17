'use client'

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import Profile from "@components/Profile";
import { useRouter } from "next/navigation";



function MyProfile(props) {
    const { data: session, status } = useSession(); // Destructure status to track loading state
    const [posts, setPosts] = useState([]);
    const router = useRouter()



    const handleEdit = async(post) => {
        router.push(`/update-prompt?id=${post._id}`)
    };
    const handleDelete = async(post) => {
        const hasConfirmed = confirm("Are you sure you want to delete?");

        if(hasConfirmed){
            try{

                await fetch(`/api/prompt/${post._id.toString()}`,{
                    method:'DELETE'
                })

                const filteredPost = posts.filter((p)=> p._id !== post._id)

                setPosts(filteredPost)
            }catch(error){
                console.log(error);
            }
        }
    };

    useEffect(() => {
        const fetchPost = async () => {
            if (session?.user?.id) {
                try {
                    const response = await fetch(`/api/users/${session.user.id}/posts`);
                    const data = await response.json();
                    setPosts(data);
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        };
        if (session?.user?.id) {
            fetchPost();
        }
    }, [session?.user?.id]); // Add session.user.id as a dependency


    return (
        <div className="">
            <Profile
                name="My"
                desc="Welcome to your personalized profile page"
                data={posts} // Ensure 'posts' is passed here
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </div>
    );
}

export default MyProfile;
