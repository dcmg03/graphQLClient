import React, { useState, useRef } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

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

const AddPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [addPost] = useMutation(ADD_POST);
    const toast = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addPost({ variables: { title, content } });
            setTitle('');
            setContent('');
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Publicación creada con éxito' });
        } catch (err) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al crear publicación' });
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
                    <InputText
                        id="content"
                        placeholder="Contenido"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="p-inputtext"
                    />
                </div>
                <Button
                    type="submit"
                    label="Crear Publicación"
                    icon="pi pi-check"
                    className="p-button-rounded p-button-success"
                />
            </form>
        </div>
    );
};

export default AddPost;
