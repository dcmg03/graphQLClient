import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import PostList from '../components/PostList';

const PostListPage = () => {
    return (
        <ProtectedRoute>
            <PostList />
        </ProtectedRoute>
    );
};

export default PostListPage;
