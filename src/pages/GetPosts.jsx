import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../service/postQueries';

const GetPosts = () => {
    const { loading, error, data, refetch } = useQuery(GET_POSTS);

    useEffect(() => {
        refetch(); // Refresca los datos cada vez que se cargue el componente
    }, [refetch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>Publicaciones</h1>
            <ul>
                {data.getPosts.map((post) => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <p>Autor: {post.author.username}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GetPosts;
