import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_POST, GET_POSTS } from '../service/postQueries';

const DeletePost = () => {
    const [id, setId] = useState('');
    const [deletePost] = useMutation(DELETE_POST, {
        refetchQueries: [{ query: GET_POSTS }], // Refresca la lista de publicaciones después de eliminar
    });

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await deletePost({ variables: { id } });
            setId('');
        } catch (error) {
            console.error("Error al eliminar la publicación:", error.message);
        }
    };

    return (
        <div>
            <h1>Eliminar Publicación</h1>
            <form onSubmit={handleDelete}>
                <input
                    type="text"
                    placeholder="ID de la Publicación"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    required
                />
                <button type="submit">Eliminar Publicación</button>
            </form>
        </div>
    );
};

export default DeletePost;
