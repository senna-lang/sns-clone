import React from 'react';

type Post = {
  created_at: string;
  id: string;
  title: string | null;
  user_id: string | null;
  profile: {
    avatar_url: string;
    id: string;
    name: string;
    username: string;
  } | null;
};

const PostsList = ({ posts }: { posts: Post[] | null }) => {
  // console.log(posts)
  return (
    <div>
      {posts?.map(post => (
        <div key={post.id}>
          {/* <p>
            {post.profile?.name}
            {post.profile?.username}
          </p> */}
          <p>{post.title}</p>
        </div>
      ))}
    </div>
  );
};

export default PostsList;
