import '../App.css';
import Navbar from '../components/navbar';
import Post from '../components/post';
import useInitPostView from '../hooks/useInitPostView';

function General({ user }) {
  const { posts } = useInitPostView();

  return (
    <div className="App">
      <div className="container">
        <Navbar user={user} />
        {posts.map((post, index) => {
          return (
            <Post
              postId={post.id}
              key={index}
              username={post.author.name}
              imgUrl={post.imgUrl}
              like={post.like}
              likedBy={post.likedBy}
              // isLike={isLike}
            />
          );
        })}
      </div>
    </div>
  );
}

export default General;
