import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_POST, GET_POSTS } from '../service/postQueries';

const AddPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [addPost] = useMutation(ADD_POST, {
        refetchQueries: [{ query: GET_POSTS }], // Refresca la lista de publicaciones después de agregar
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addPost({ variables: { title, content } });
            setTitle('');
            setContent('');
        } catch (error) {
            console.error("Error al agregar la publicación:", error.message);
        }
    };

    return (
        <div>
            <h1>Agregar Publicación</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Contenido"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <button type="submit">Agregar Publicación</button>
            </form>
        </div>
    );
};

export default AddPost;
