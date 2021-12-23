import { NavBar } from '../components/Navbar'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { usePostsQuery } from '../generated/graphql'

const Index = () => {
  const [{ data }] = usePostsQuery()
  return (
    <>
      <NavBar />
      Hello world
      {data &&
        data.posts.map(post => (
          <div id={post.id} key={post.id}>
            {post.title}
          </div>
        ))}
    </>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
