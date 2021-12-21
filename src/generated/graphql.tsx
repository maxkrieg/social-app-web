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
  createPost: Post
  deletePost: Scalars['Boolean']
  login: UserResponse
  register: UserResponse
  updatePost?: Maybe<Post>
}

export type MutationCreatePostArgs = {
  title: Scalars['String']
}

export type MutationDeletePostArgs = {
  id: Scalars['ID']
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

export type Post = {
  __typename?: 'Post'
  createdAt: Scalars['String']
  id: Scalars['ID']
  title: Scalars['String']
  updatedAt: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  currentUser?: Maybe<User>
  hello: Scalars['String']
  post?: Maybe<Post>
  posts: Array<Post>
}

export type QueryPostArgs = {
  id: Scalars['ID']
}

export type User = {
  __typename?: 'User'
  createdAt: Scalars['String']
  email: Scalars['String']
  id: Scalars['ID']
  updatedAt: Scalars['String']
}

export type UserResponse = {
  __typename?: 'UserResponse'
  errors?: Maybe<Array<FieldError>>
  user?: Maybe<User>
}

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

export const LoginDocument = gql`
  mutation Login($options: EmailPasswordInput!) {
    login(options: $options) {
      errors {
        field
        message
      }
      user {
        id
        email
      }
    }
  }
`

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument)
}
export const RegisterDocument = gql`
  mutation Register($options: EmailPasswordInput!) {
    register(options: $options) {
      errors {
        field
        message
      }
      user {
        id
        email
      }
    }
  }
`

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument)
}
export const CurrentUserDocument = gql`
  query CurrentUser {
    currentUser {
      id
      email
    }
  }
`

export function useCurrentUserQuery(
  options: Omit<Urql.UseQueryArgs<CurrentUserQueryVariables>, 'query'> = {}
) {
  return Urql.useQuery<CurrentUserQuery>({ query: CurrentUserDocument, ...options })
}
