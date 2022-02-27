import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type EmailPasswordInput = {
  email: Scalars['String']
  password: Scalars['String']
}

export type FieldError = {
  __typename?: 'FieldError'
  field: Scalars['String']
  message: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  changePassword: UserResponse
  createPost?: Maybe<Post>
  deletePost: Scalars['Boolean']
  forgotPassword: Scalars['Boolean']
  login: UserResponse
  logout: Scalars['Boolean']
  register: UserResponse
  updatePost?: Maybe<Post>
}

export type MutationChangePasswordArgs = {
  newPassword: Scalars['String']
  token: Scalars['String']
}

export type MutationCreatePostArgs = {
  input: PostInput
}

export type MutationDeletePostArgs = {
  id: Scalars['ID']
}

export type MutationForgotPasswordArgs = {
  email: Scalars['String']
}

export type MutationLoginArgs = {
  options: EmailPasswordInput
}

export type MutationRegisterArgs = {
  options: EmailPasswordInput
}

export type MutationUpdatePostArgs = {
  id: Scalars['ID']
  title: Scalars['String']
}

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts'
  hasMore: Scalars['Boolean']
  posts: Array<Post>
}

export type Post = {
  __typename?: 'Post'
  createdAt: Scalars['String']
  id: Scalars['ID']
  points: Scalars['Float']
  text: Scalars['String']
  textSnippet: Scalars['String']
  title: Scalars['String']
  updatedAt: Scalars['String']
  user: User
}

export type PostInput = {
  text: Scalars['String']
  title: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  currentUser?: Maybe<User>
  hello: Scalars['String']
  post?: Maybe<Post>
  posts: PaginatedPosts
}

export type QueryPostArgs = {
  id: Scalars['ID']
}

export type QueryPostsArgs = {
  cursor?: Maybe<Scalars['String']>
  limit: Scalars['Int']
}

export type User = {
  __typename?: 'User'
  createdAt: Scalars['String']
  email: Scalars['String']
  id: Scalars['ID']
  posts: Array<Post>
  updatedAt: Scalars['String']
}

export type UserResponse = {
  __typename?: 'UserResponse'
  errors?: Maybe<Array<FieldError>>
  user?: Maybe<User>
}

export type BaseErrorsFragment = { __typename?: 'FieldError'; field: string; message: string }

export type BaseUserFragment = { __typename?: 'User'; id: string; email: string }

export type BaseUserResponseFragment = {
  __typename?: 'UserResponse'
  errors?: Array<{ __typename?: 'FieldError'; field: string; message: string }> | null | undefined
  user?: { __typename?: 'User'; id: string; email: string } | null | undefined
}

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String']
  newPassword: Scalars['String']
}>

export type ChangePasswordMutation = {
  __typename?: 'Mutation'
  changePassword: {
    __typename?: 'UserResponse'
    errors?: Array<{ __typename?: 'FieldError'; field: string; message: string }> | null | undefined
    user?: { __typename?: 'User'; id: string; email: string } | null | undefined
  }
}

export type CreatePostMutationVariables = Exact<{
  input: PostInput
}>

export type CreatePostMutation = {
  __typename?: 'Mutation'
  createPost?:
    | {
        __typename?: 'Post'
        id: string
        points: number
        text: string
        title: string
        createdAt: string
        updatedAt: string
        user: { __typename?: 'User'; id: string }
      }
    | null
    | undefined
}

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String']
}>

export type ForgotPasswordMutation = { __typename?: 'Mutation'; forgotPassword: boolean }

export type LoginMutationVariables = Exact<{
  options: EmailPasswordInput
}>

export type LoginMutation = {
  __typename?: 'Mutation'
  login: {
    __typename?: 'UserResponse'
    errors?: Array<{ __typename?: 'FieldError'; field: string; message: string }> | null | undefined
    user?: { __typename?: 'User'; id: string; email: string } | null | undefined
  }
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = { __typename?: 'Mutation'; logout: boolean }

export type RegisterMutationVariables = Exact<{
  options: EmailPasswordInput
}>

export type RegisterMutation = {
  __typename?: 'Mutation'
  register: {
    __typename?: 'UserResponse'
    errors?: Array<{ __typename?: 'FieldError'; field: string; message: string }> | null | undefined
    user?: { __typename?: 'User'; id: string; email: string } | null | undefined
  }
}

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>

export type CurrentUserQuery = {
  __typename?: 'Query'
  currentUser?: { __typename?: 'User'; id: string; email: string } | null | undefined
}

export type PostsQueryVariables = Exact<{
  limit: Scalars['Int']
  cursor?: Maybe<Scalars['String']>
}>

export type PostsQuery = {
  __typename?: 'Query'
  posts: {
    __typename?: 'PaginatedPosts'
    hasMore: boolean
    posts: Array<{
      __typename?: 'Post'
      id: string
      createdAt: string
      updatedAt: string
      title: string
      textSnippet: string
    }>
  }
}

export const BaseErrorsFragmentDoc = gql`
  fragment BaseErrors on FieldError {
    field
    message
  }
`
export const BaseUserFragmentDoc = gql`
  fragment BaseUser on User {
    id
    email
  }
`
export const BaseUserResponseFragmentDoc = gql`
  fragment BaseUserResponse on UserResponse {
    errors {
      ...BaseErrors
    }
    user {
      ...BaseUser
    }
  }
  ${BaseErrorsFragmentDoc}
  ${BaseUserFragmentDoc}
`
export const ChangePasswordDocument = gql`
  mutation ChangePassword($token: String!, $newPassword: String!) {
    changePassword(token: $token, newPassword: $newPassword) {
      ...BaseUserResponse
    }
  }
  ${BaseUserResponseFragmentDoc}
`

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(
    ChangePasswordDocument
  )
}
export const CreatePostDocument = gql`
  mutation CreatePost($input: PostInput!) {
    createPost(input: $input) {
      id
      points
      text
      title
      createdAt
      updatedAt
      user {
        id
      }
    }
  }
`

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument)
}
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(
    ForgotPasswordDocument
  )
}
export const LoginDocument = gql`
  mutation Login($options: EmailPasswordInput!) {
    login(options: $options) {
      ...BaseUserResponse
    }
  }
  ${BaseUserResponseFragmentDoc}
`

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument)
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument)
}
export const RegisterDocument = gql`
  mutation Register($options: EmailPasswordInput!) {
    register(options: $options) {
      ...BaseUserResponse
    }
  }
  ${BaseUserResponseFragmentDoc}
`

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument)
}
export const CurrentUserDocument = gql`
  query CurrentUser {
    currentUser {
      ...BaseUser
    }
  }
  ${BaseUserFragmentDoc}
`

export function useCurrentUserQuery(
  options: Omit<Urql.UseQueryArgs<CurrentUserQueryVariables>, 'query'> = {}
) {
  return Urql.useQuery<CurrentUserQuery>({ query: CurrentUserDocument, ...options })
}
export const PostsDocument = gql`
  query Posts($limit: Int!, $cursor: String) {
    posts(limit: $limit, cursor: $cursor) {
      posts {
        id
        createdAt
        updatedAt
        title
        textSnippet
      }
      hasMore
    }
  }
`

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options })
}
