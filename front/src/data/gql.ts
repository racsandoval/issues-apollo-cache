import { gql } from "@apollo/client";

export const GET_RELOAD_TODO = gql`
  query GetReloadTodos {
    reloadTodos {
      id
      title
      entryAnimated @client
      exitAnimated @client
    }
  }
`;

export const CREATE_RELOAD_TODO = gql`
  mutation CreateReloadTodo($data: CreateTodoInput!) {
    createReloadTodo(data: $data) {
      id
      title
    }
  }
`;

export const REMOVE_RELOAD_TODO = gql`
  mutation RemoveReloadTodo($id: String!) {
    removeReloadTodo(id: $id) {
      id
      title
    }
  }
`;

export const GET_REFECTH_TODO = gql`
  query GetRefetchTodos {
    refetchTodos {
      id
      title
      entryAnimated @client
      exitAnimated @client
    }
  }
`;

export const CREATE_REFECTH_TODO = gql`
  mutation CreateRefetchTodo($data: CreateTodoInput!) {
    createRefetchTodo(data: $data) {
      id
      title
    }
  }
`;

export const REMOVE_REFECTH_TODO = gql`
  mutation RemoveRefetchTodo($id: String!) {
    removeRefetchTodo(id: $id) {
      id
      title
    }
  }
`;

export const GET_CACHE_TODO = gql`
  query GetCacheTodos {
    cacheTodos {
      id
      title
      entryAnimated @client
      exitAnimated @client
    }
  }
`;

export const CREATE_CACHE_TODO = gql`
  mutation CreateCacheTodo($data: CreateTodoInput!) {
    createCacheTodo(data: $data) {
      id
      title
    }
  }
`;

export const REMOVE_CACHE_TODO = gql`
  mutation RemoveCacheTodo($id: String!) {
    removeCacheTodo(id: $id) {
      id
      title
    }
  }
`;

export const GET_OPTIMISTIC_TODO = gql`
  query GetOptimisticTodos {
    optimisticTodos {
      id
      title
      entryAnimated @client
      exitAnimated @client
    }
  }
`;

export const CREATE_OPTIMISTIC_TODO = gql`
  mutation CreateOptimisticTodo($data: CreateTodoInput!) {
    createOptimisticTodo(data: $data) {
      id
      title
    }
  }
`;

export const REMOVE_OPTIMISTIC_TODO = gql`
  mutation RemoveOptimisticTodo($id: String!) {
    removeOptimisticTodo(id: $id) {
      id
      title
    }
  }
`;