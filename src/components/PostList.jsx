import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useAuth } from '../context/AuthContext';

const GET_POSTS = gql`
    query GetPosts {
        getPosts {
            id
            title
            content
            author {
                username
            }
        }
    }
`;

const ADD_POST = gql`
    mutation AddPost($title: String!, $content: String!) {
        addPost(title: $title, content: $content) {
            id
            title
            content
            author {
                username
            }
        }
    }
`;

const DELETE_POST = gql`
    mutation DeletePost($id: ID!) {
        deletePost(id: $id)
    }
`;

const PostList = () => {
    const { isAuthenticated } = useAuth();
    const { loading, error, data, refetch } = useQuery(GET_POSTS);
    const [addPost] = useMutation(ADD_POST, {
        onCompleted: () => refetch(),
    });
    const [deletePost] = useMutation(DELETE_POST, {
        onCompleted: () => refetch(),
    });

    const [newPost, setNewPost] = useState({ title: '', content: '' });

    useEffect(() => {
        if (isAuthenticated) {
            refetch();
        }
    }, [isAuthenticated, refetch]);

    if (!isAuthenticated) {
        return <p>Debes iniciar sesión para ver las publicaciones.</p>;
    }

    if (loading) return <p>Cargando publicaciones...</p>;
    if (error) return <p>Error al cargar publicaciones: {error.message}</p>;

    const handleAddPost = async (e) => {
        e.preventDefault();
        try {
            await addPost({ variables: newPost });
            setNewPost({ title: '', content: '' });
            alert('Publicación creada con éxito');
        } catch (err) {
            console.error('Error al crear publicación:', err.message);
        }
    };

    const handleDeletePost = async (id) => {
        try {
            await deletePost({ variables: { id } });
            alert('Publicación eliminada con éxito');
        } catch (err) {
            console.error('Error al eliminar publicación:', err.message);
        }
    };

    return (
        <div>
            <h2>Publicaciones</h2>
            <form onSubmit={handleAddPost}>
                <input
                    type="text"
                    placeholder="Título"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                />
                <textarea
                    placeholder="Contenido"
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                />
                <button type="submit">Crear Publicación</button>
            </form>
            <div>
                {data.getPosts.map((post) => (
                    <div key={post.id} style={{ border: '1px solid #ddd', margin: '10px', padding: '10px' }}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <p>Autor: {post.author.username}</p>
                        <button onClick={() => handleDeletePost(post.id)}>Eliminar</button>
                        {/* Botón de Actualizar puede ser agregado más adelante */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostList;
