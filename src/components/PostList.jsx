import React, { useRef, useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import { Divider } from 'primereact/divider';
import { Panel } from 'primereact/panel';

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

const GET_MY_POSTS = gql`
    query GetMyPosts {
        getMyPosts {
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

const UPDATE_POST = gql`
    mutation UpdatePost($id: ID!, $title: String!, $content: String!) {
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
    const { loading: loadingAll, error: errorAll, data: allPosts, refetch: refetchAll } = useQuery(GET_POSTS);
    const { loading: loadingMine, error: errorMine, data: myPosts, refetch: refetchMine } = useQuery(GET_MY_POSTS);
    const [addPost] = useMutation(ADD_POST);
    const [updatePost] = useMutation(UPDATE_POST);
    const [deletePost] = useMutation(DELETE_POST);

    const [editPost, setEditPost] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const toast = useRef(null);

    const handleAddPost = async () => {
        if (!postTitle || !postContent) {
            toast.current.show({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'El título y el contenido no pueden estar vacíos',
            });
            return;
        }

        try {
            await addPost({
                variables: {
                    title: postTitle,
                    content: postContent,
                },
            });
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Publicación creada' });
            setPostTitle('');
            setPostContent('');
            refetchAll();
            refetchMine();
        } catch (err) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo crear la publicación' });
        }
    };

    const handleUpdate = async () => {
        if (!newTitle || !newContent) {
            toast.current.show({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'El título y el contenido no pueden estar vacíos',
            });
            return;
        }

        try {
            await updatePost({
                variables: {
                    id: editPost.id,
                    title: newTitle,
                    content: newContent,
                },
            });
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Publicación actualizada' });
            setEditPost(null);
            setNewTitle('');
            setNewContent('');
            refetchAll();
            refetchMine();
        } catch (err) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar la publicación' });
        }
    };

    const handleDelete = async (id) => {
        try {
            await deletePost({ variables: { id } });
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Publicación eliminada' });
            refetchAll();
            refetchMine();
        } catch (err) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la publicación' });
        }
    };

    if (loadingAll || loadingMine) return <p>Cargando...</p>;
    if (errorAll || errorMine) return <p>Error al cargar publicaciones</p>;

    return (
        <div className="p-grid p-justify-center p-mt-5">
            <Toast ref={toast} />
            <div className="p-col-12 p-md-10">
                <Panel header="Crear Nueva Publicación" className="p-shadow-3">
                    <div className="p-fluid">
                        <div className="p-field">
                            <InputText
                                value={postTitle}
                                onChange={(e) => setPostTitle(e.target.value)}
                                placeholder="Título"
                            />
                        </div>
                        <div className="p-field">
                            <InputTextarea
                                value={postContent}
                                onChange={(e) => setPostContent(e.target.value)}
                                placeholder="Contenido"
                                rows={5}
                            />
                        </div>
                        <div className="p-text-center">
                            <Button
                                label="Crear Publicación"
                                icon="pi pi-plus"
                                className="p-button-success"
                                onClick={handleAddPost}
                            />
                        </div>
                    </div>
                </Panel>

                <Divider />

                <Panel header="Mis Publicaciones" className="p-shadow-3">
                    <div className="p-grid">
                        {myPosts.getMyPosts.map((post) => (
                            <div key={post.id} className="p-col-12 p-md-4">
                                <Card title={post.title} subTitle={`Autor: ${post.author.username}`} className="p-shadow-3">
                                    <p>{post.content}</p>
                                    <div className="p-d-flex p-jc-between">
                                        <Button
                                            label="Editar"
                                            icon="pi pi-pencil"
                                            className="p-button-info"
                                            onClick={() => {
                                                setEditPost(post);
                                                setNewTitle(post.title);
                                                setNewContent(post.content);
                                            }}
                                        />
                                        <Button
                                            label="Eliminar"
                                            icon="pi pi-trash"
                                            className="p-button-danger"
                                            onClick={() => handleDelete(post.id)}
                                        />
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>
                </Panel>

                <Divider />

                <Panel header="Publicaciones de Otros Usuarios" className="p-shadow-3">
                    <div className="p-grid">
                        {allPosts.getPosts
                            .filter((post) => !myPosts.getMyPosts.some((myPost) => myPost.id === post.id))
                            .map((post) => (
                                <div key={post.id} className="p-col-12 p-md-4">
                                    <Card title={post.title} subTitle={`Autor: ${post.author.username}`} className="p-shadow-3">
                                        <p>{post.content}</p>
                                    </Card>
                                </div>
                            ))}
                    </div>
                </Panel>
            </div>

            <Dialog
                header="Actualizar Publicación"
                visible={!!editPost}
                onHide={() => setEditPost(null)}
                footer={
                    <div>
                        <Button
                            label="Cancelar"
                            icon="pi pi-times"
                            className="p-button-text"
                            onClick={() => setEditPost(null)}
                        />
                        <Button
                            label="Guardar"
                            icon="pi pi-check"
                            className="p-button-success"
                            onClick={handleUpdate}
                        />
                    </div>
                }
            >
                <div className="p-field">
                    <label htmlFor="title">Título</label>
                    <InputText
                        id="title"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="content">Contenido</label>
                    <InputTextarea
                        id="content"
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        rows={5}
                    />
                </div>
            </Dialog>
        </div>
    );
};

export default PostList;
