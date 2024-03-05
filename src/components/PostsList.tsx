import React from 'react';
import LikeButton from './LikeButton';


const PostsList = ({ posts }: {posts:PostsWithAuthor[]}) => {
  // console.log(posts)
  return (
    <div>
      {posts?.map(post => (
        <div key={post.id}>
          <p>
            {post.profile?.name}
            {post.profile?.username}
          </p>
          <p>{post.title}</p>
          <LikeButton post={post} />
        </div>
      ))}
    </div>
  );
};

export default PostsList;
