import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import AddPost from '../components/AddPost';

const AddPostPage = () => {
    return (
        <ProtectedRoute>
            <AddPost />
        </ProtectedRoute>
    );
};

export default AddPostPage;
