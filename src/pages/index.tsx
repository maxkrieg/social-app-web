import { NavBar } from '../components/Navbar'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { usePostsQuery } from '../generated/graphql'

const Index = () => {
  const [{ data }] = usePostsQuery()
  return (
    <div>
      <NavBar />
      Hello world
      {data && data.posts.map(post => <div id={post.id}>{post.title}</div>)}
    </div>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
