import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';

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

const UPDATE_POST = gql`
    mutation UpdatePost($id: ID!, $title: String, $content: String) {
        updatePost(id: $id, title: $title, content: $content) {
            id
            title
            content
        }
    }
`;

const DELETE_POST = gql`
    mutation DeletePost($id: ID!) {
        deletePost(id: $id)
    }
`;

const PostList = () => {
    const { data, loading, error, refetch } = useQuery(GET_POSTS);
    const [updatePost] = useMutation(UPDATE_POST);
    const [deletePost] = useMutation(DELETE_POST);
    const [selectedPost, setSelectedPost] = useState(null);
    const [isDialogVisible, setDialogVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const toast = React.useRef(null);

    const handleUpdate = async () => {
        try {
            await updatePost({
                variables: { id: selectedPost.id, title, content },
            });
            toast.current.show({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Publicación actualizada con éxito',
            });
            refetch();
            setDialogVisible(false);
        } catch (err) {
            console.error('Error al actualizar publicación:', err.message);
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo actualizar la publicación',
            });
        }
    };

    const handleDelete = async (id) => {
        try {
            await deletePost({ variables: { id } });
            toast.current.show({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Publicación eliminada con éxito',
            });
            refetch();
        } catch (err) {
            console.error('Error al eliminar publicación:', err.message);
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo eliminar la publicación',
            });
        }
    };

    const openEditDialog = (post) => {
        setSelectedPost(post);
        setTitle(post.title);
        setContent(post.content);
        setDialogVisible(true);
    };

    if (loading) return <p>Cargando publicaciones...</p>;
    if (error) return <p>Error al cargar publicaciones</p>;

    return (
        <div>
            <Toast ref={toast} />
            <h2>Lista de Publicaciones</h2>
            <ul>
                {data.getPosts.map((post) => (
                    <li key={post.id} style={{ marginBottom: '20px' }}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <p>
                            <strong>Autor:</strong> {post.author.username}
                        </p>
                        <Button
                            label="Editar"
                            icon="pi pi-pencil"
                            className="p-button-rounded p-button-warning"
                            onClick={() => openEditDialog(post)}
                        />
                        <Button
                            label="Eliminar"
                            icon="pi pi-trash"
                            className="p-button-rounded p-button-danger"
                            onClick={() => handleDelete(post.id)}
                            style={{ marginLeft: '10px' }}
                        />
                    </li>
                ))}
            </ul>
            <Dialog
                header="Editar Publicación"
                visible={isDialogVisible}
                style={{ width: '50vw' }}
                onHide={() => setDialogVisible(false)}
            >
                <div className="p-field">
                    <label htmlFor="title">Título</label>
                    <InputText
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="p-inputtext"
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="content">Contenido</label>
                    <InputText
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="p-inputtext"
                    />
                </div>
                <Button
                    label="Actualizar"
                    icon="pi pi-check"
                    className="p-button-rounded p-button-success"
                    onClick={handleUpdate}
                />
            </Dialog>
        </div>
    );
};

export default PostList;
