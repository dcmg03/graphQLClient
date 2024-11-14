import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_POST, GET_POSTS } from '../service/postQueries';

const UpdatePost = () => {
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [updatePost] = useMutation(UPDATE_POST, {
        refetchQueries: [{ query: GET_POSTS }], // Refresca la lista después de actualizar
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updatePost({ variables: { id, title, content } });
            setId('');
            setTitle('');
            setContent('');
        } catch (error) {
            console.error("Error al actualizar la publicación:", error.message);
        }
    };

    return (
        <div>
            <h1>Actualizar Publicación</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="ID de la Publicación"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Nuevo Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Nuevo Contenido"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button type="submit">Actualizar Publicación</button>
            </form>
        </div>
    );
};

export default UpdatePost;
