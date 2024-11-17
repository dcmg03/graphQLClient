import React, { useState, useRef } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { InputTextarea } from 'primereact/inputtextarea';

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

const AddPost = ({ refetchPosts }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [addPost, { loading }] = useMutation(ADD_POST);
    const toast = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            toast.current.show({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Todos los campos son obligatorios',
            });
            return;
        }
        try {
            await addPost({ variables: { title, content } });
            setTitle('');
            setContent('');
            toast.current.show({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Publicación creada con éxito',
            });
            if (refetchPosts) refetchPosts(); // Refresca la lista de publicaciones si es necesario
        } catch (err) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo crear la publicación',
            });
            console.error('Error al crear publicación:', err.message);
        }
    };

    return (
        <div className="add-post-container">
            <Toast ref={toast} />
            <h2>Crear Nueva Publicación</h2>
            <form onSubmit={handleSubmit} className="add-post-form">
                <div className="p-field">
                    <label htmlFor="title">Título</label>
                    <InputText
                        id="title"
                        placeholder="Título"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="p-inputtext"
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="content">Contenido</label>
                    <InputTextarea
                        id="content"
                        rows={5}
                        placeholder="Contenido"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="p-inputtext"
                    />
                </div>
                <Button
                    type="submit"
                    label={loading ? 'Creando...' : 'Crear Publicación'}
                    icon="pi pi-check"
                    className="p-button-rounded p-button-success"
                    disabled={loading}
                />
            </form>
        </div>
    );
};

export default AddPost;
