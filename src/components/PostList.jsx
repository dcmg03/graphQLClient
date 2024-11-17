import React, { useEffect, useRef, useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';

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
    const { loading, error, data, refetch } = useQuery(GET_POSTS);
    const [addPost] = useMutation(ADD_POST);
    const [deletePost] = useMutation(DELETE_POST);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const toast = useRef(null);

    const handleAddPost = async (e) => {
        e.preventDefault();
        try {
            await addPost({ variables: { title, content } });
            setTitle('');
            setContent('');
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Publicación creada con éxito' });
            refetch();
        } catch (err) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al crear publicación' });
            console.error(err.message);
        }
    };

    const handleDeletePost = async (id) => {
        try {
            await deletePost({ variables: { id } });
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Publicación eliminada con éxito' });
            refetch();
        } catch (err) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al eliminar publicación' });
            console.error(err.message);
        }
    };

    if (loading) return <ProgressSpinner />;
    if (error) return <p>Error al cargar publicaciones: {error.message}</p>;

    return (
        <div className="p-grid p-justify-center">
            <Toast ref={toast} />
            <div className="p-col-12 p-md-6">
                <Card title="Crear Nueva Publicación">
                    <form onSubmit={handleAddPost} className="p-fluid">
                        <div className="p-field">
                            <label htmlFor="title">Título</label>
                            <InputText
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Escribe el título"
                            />
                        </div>
                        <div className="p-field">
                            <label htmlFor="content">Contenido</label>
                            <InputTextarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={5}
                                placeholder="Escribe el contenido de la publicación"
                            />
                        </div>
                        <Button
                            type="submit"
                            label="Crear Publicación"
                            icon="pi pi-check"
                            className="p-button-success"
                        />
                    </form>
                </Card>
            </div>
            <div className="p-col-12 p-md-8">
                <h2>Publicaciones</h2>
                {data.getPosts.map((post) => (
                    <Card key={post.id} title={post.title} className="p-mb-3">
                        <p>{post.content}</p>
                        <p>
                            <strong>Autor:</strong> {post.author.username}
                        </p>
                        <Button
                            label="Eliminar"
                            icon="pi pi-trash"
                            className="p-button-danger"
                            onClick={() => handleDeletePost(post.id)}
                        />
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default PostList;
