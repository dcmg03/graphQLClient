import { gql } from '@apollo/client';

// Query para obtener todas las publicaciones
export const GET_POSTS = gql`
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

// Mutación para agregar una nueva publicación
export const ADD_POST = gql`
  mutation AddPost($title: String!, $content: String!) {
    addPost(title: $title, content: $content) {
      id
      title
      content
    }
  }
`;

// Mutación para actualizar una publicación existente
export const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $title: String, $content: String) {
    updatePost(id: $id, title: $title, content: $content) {
      id
      title
      content
    }
  }
`;

// Mutación para eliminar una publicación
export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;
