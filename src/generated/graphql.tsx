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

export type Event = {
  __typename?: 'Event'
  createdAt: Scalars['String']
  description: Scalars['String']
  id: Scalars['ID']
  location: Scalars['String']
  title: Scalars['String']
  updatedAt: Scalars['String']
  user: User
  userId: Scalars['Float']
}

export type EventInput = {
  description: Scalars['String']
  location: Scalars['String']
  title: Scalars['String']
}

export type FieldError = {
  __typename?: 'FieldError'
  field: Scalars['String']
  message: Scalars['String']
}

export type LoginInput = {
  email: Scalars['String']
  password: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  changePassword: UserResponse
  createEvent?: Maybe<Event>
  createPost?: Maybe<Post>
  deleteEvent: Scalars['Boolean']
  deletePost: Scalars['Boolean']
  forgotPassword: Scalars['Boolean']
  login: UserResponse
  logout: Scalars['Boolean']
  register: UserResponse
  updateEvent?: Maybe<Event>
  updatePost?: Maybe<Post>
  vote: Scalars['Int']
}

export type MutationChangePasswordArgs = {
  newPassword: Scalars['String']
  token: Scalars['String']
}

export type MutationCreateEventArgs = {
  input: EventInput
}

export type MutationCreatePostArgs = {
  input: PostInput
}

export type MutationDeleteEventArgs = {
  id: Scalars['ID']
}

export type MutationDeletePostArgs = {
  id: Scalars['ID']
}

export type MutationForgotPasswordArgs = {
  email: Scalars['String']
}

export type MutationLoginArgs = {
  options: LoginInput
}

export type MutationRegisterArgs = {
  options: RegisterInput
}

export type MutationUpdateEventArgs = {
  description: Scalars['String']
  id: Scalars['ID']
  location: Scalars['String']
  title: Scalars['String']
}

export type MutationUpdatePostArgs = {
  id: Scalars['ID']
  text: Scalars['String']
  title: Scalars['String']
}

export type MutationVoteArgs = {
  postId: Scalars['ID']
  value: Scalars['Int']
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
  userId: Scalars['Float']
  voteStatus?: Maybe<Scalars['Int']>
}

export type PostInput = {
  text: Scalars['String']
  title: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  currentUser?: Maybe<User>
  event?: Maybe<Event>
  hello: Scalars['String']
  post?: Maybe<Post>
  posts: PaginatedPosts
}

export type QueryEventArgs = {
  id: Scalars['ID']
}

export type QueryPostArgs = {
  id: Scalars['ID']
}

export type QueryPostsArgs = {
  cursor?: Maybe<Scalars['String']>
  limit: Scalars['Int']
}

export type RegisterInput = {
  email: Scalars['String']
  password: Scalars['String']
  username: Scalars['String']
}

export type User = {
  __typename?: 'User'
  createdAt: Scalars['String']
  email: Scalars['String']
  events: Array<Event>
  id: Scalars['ID']
  posts: Array<Post>
  updatedAt: Scalars['String']
  username: Scalars['String']
}

export type UserResponse = {
  __typename?: 'UserResponse'
  errors?: Maybe<Array<FieldError>>
  user?: Maybe<User>
}

export type BaseErrorsFragment = { __typename?: 'FieldError'; field: string; message: string }

export type BaseUserFragment = { __typename?: 'User'; id: string; email: string; username: string }

export type BaseUserResponseFragment = {
  __typename?: 'UserResponse'
  errors?: Array<{ __typename?: 'FieldError'; field: string; message: string }> | null | undefined
  user?: { __typename?: 'User'; id: string; email: string; username: string } | null | undefined
}

export type PostSnippetFragment = {
  __typename?: 'Post'
  id: string
  createdAt: string
  updatedAt: string
  title: string
  textSnippet: string
  points: number
  voteStatus?: number | null | undefined
  user: { __typename?: 'User'; id: string; username: string }
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
    user?: { __typename?: 'User'; id: string; email: string; username: string } | null | undefined
  }
}

export type CreateEventMutationVariables = Exact<{
  input: EventInput
}>

export type CreateEventMutation = {
  __typename?: 'Mutation'
  createEvent?:
    | {
        __typename?: 'Event'
        id: string
        title: string
        description: string
        location: string
        createdAt: string
        updatedAt: string
        user: { __typename?: 'User'; id: string }
      }
    | null
    | undefined
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

export type DeleteEventMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type DeleteEventMutation = { __typename?: 'Mutation'; deleteEvent: boolean }

export type DeletePostMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type DeletePostMutation = { __typename?: 'Mutation'; deletePost: boolean }

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String']
}>

export type ForgotPasswordMutation = { __typename?: 'Mutation'; forgotPassword: boolean }

export type LoginMutationVariables = Exact<{
  options: LoginInput
}>

export type LoginMutation = {
  __typename?: 'Mutation'
  login: {
    __typename?: 'UserResponse'
    errors?: Array<{ __typename?: 'FieldError'; field: string; message: string }> | null | undefined
    user?: { __typename?: 'User'; id: string; email: string; username: string } | null | undefined
  }
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = { __typename?: 'Mutation'; logout: boolean }

export type RegisterMutationVariables = Exact<{
  options: RegisterInput
}>

export type RegisterMutation = {
  __typename?: 'Mutation'
  register: {
    __typename?: 'UserResponse'
    errors?: Array<{ __typename?: 'FieldError'; field: string; message: string }> | null | undefined
    user?: { __typename?: 'User'; id: string; email: string; username: string } | null | undefined
  }
}

export type UpdateEventMutationVariables = Exact<{
  id: Scalars['ID']
  title: Scalars['String']
  location: Scalars['String']
  description: Scalars['String']
}>

export type UpdateEventMutation = {
  __typename?: 'Mutation'
  updateEvent?:
    | { __typename?: 'Event'; id: string; title: string; location: string; description: string }
    | null
    | undefined
}

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['ID']
  title: Scalars['String']
  text: Scalars['String']
}>

export type UpdatePostMutation = {
  __typename?: 'Mutation'
  updatePost?:
    | { __typename?: 'Post'; id: string; title: string; text: string; textSnippet: string }
    | null
    | undefined
}

export type VoteMutationVariables = Exact<{
  value: Scalars['Int']
  postId: Scalars['ID']
}>

export type VoteMutation = { __typename?: 'Mutation'; vote: number }

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>

export type CurrentUserQuery = {
  __typename?: 'Query'
  currentUser?:
    | { __typename?: 'User'; id: string; email: string; username: string }
    | null
    | undefined
}

export type EventQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type EventQuery = {
  __typename?: 'Query'
  event?:
    | {
        __typename?: 'Event'
        id: string
        title: string
        location: string
        description: string
        createdAt: string
        updatedAt: string
        user: { __typename?: 'User'; id: string; username: string }
      }
    | null
    | undefined
}

export type PostQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type PostQuery = {
  __typename?: 'Query'
  post?:
    | {
        __typename?: 'Post'
        id: string
        title: string
        text: string
        createdAt: string
        updatedAt: string
        user: { __typename?: 'User'; id: string; username: string }
      }
    | null
    | undefined
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
      points: number
      voteStatus?: number | null | undefined
      user: { __typename?: 'User'; id: string; username: string }
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
    username
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
export const PostSnippetFragmentDoc = gql`
  fragment PostSnippet on Post {
    id
    createdAt
    updatedAt
    title
    textSnippet
    points
    voteStatus
    user {
      id
      username
    }
  }
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
export const CreateEventDocument = gql`
  mutation CreateEvent($input: EventInput!) {
    createEvent(input: $input) {
      id
      title
      description
      location
      createdAt
      updatedAt
      user {
        id
      }
    }
  }
`

export function useCreateEventMutation() {
  return Urql.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument)
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
export const DeleteEventDocument = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id)
  }
`

export function useDeleteEventMutation() {
  return Urql.useMutation<DeleteEventMutation, DeleteEventMutationVariables>(DeleteEventDocument)
}
export const DeletePostDocument = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`

export function useDeletePostMutation() {
  return Urql.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument)
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
  mutation Login($options: LoginInput!) {
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
  mutation Register($options: RegisterInput!) {
    register(options: $options) {
      ...BaseUserResponse
    }
  }
  ${BaseUserResponseFragmentDoc}
`

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument)
}
export const UpdateEventDocument = gql`
  mutation UpdateEvent($id: ID!, $title: String!, $location: String!, $description: String!) {
    updateEvent(id: $id, title: $title, location: $location, description: $description) {
      id
      title
      location
      description
    }
  }
`

export function useUpdateEventMutation() {
  return Urql.useMutation<UpdateEventMutation, UpdateEventMutationVariables>(UpdateEventDocument)
}
export const UpdatePostDocument = gql`
  mutation UpdatePost($id: ID!, $title: String!, $text: String!) {
    updatePost(id: $id, title: $title, text: $text) {
      id
      title
      text
      textSnippet
    }
  }
`

export function useUpdatePostMutation() {
  return Urql.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument)
}
export const VoteDocument = gql`
  mutation Vote($value: Int!, $postId: ID!) {
    vote(value: $value, postId: $postId)
  }
`

export function useVoteMutation() {
  return Urql.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument)
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
export const EventDocument = gql`
  query Event($id: ID!) {
    event(id: $id) {
      id
      title
      location
      description
      createdAt
      updatedAt
      user {
        id
        username
      }
    }
  }
`

export function useEventQuery(options: Omit<Urql.UseQueryArgs<EventQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<EventQuery>({ query: EventDocument, ...options })
}
export const PostDocument = gql`
  query Post($id: ID!) {
    post(id: $id) {
      id
      title
      text
      createdAt
      updatedAt
      user {
        id
        username
      }
    }
  }
`

export function usePostQuery(options: Omit<Urql.UseQueryArgs<PostQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostQuery>({ query: PostDocument, ...options })
}
export const PostsDocument = gql`
  query Posts($limit: Int!, $cursor: String) {
    posts(limit: $limit, cursor: $cursor) {
      posts {
        ...PostSnippet
      }
      hasMore
    }
  }
  ${PostSnippetFragmentDoc}
`

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options })
}
