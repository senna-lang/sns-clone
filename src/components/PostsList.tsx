'use client';
import React, { useOptimistic } from 'react';
import LikeButton from './LikeButton';

const PostsList = ({ posts }: { posts: PostsWithAuthor[] }) => {
  const [optimisticPosts, addOptimisticPosts] = useOptimistic<
    PostsWithAuthor[],
    PostsWithAuthor
  >(posts, (currentOptimisticPosts, newPosts) => {
    const newOptimisticPosts = [...currentOptimisticPosts];
    const index = newOptimisticPosts.findIndex(post => post.id === newPosts.id);
    newOptimisticPosts[index] = newPosts;
    return newOptimisticPosts;
  });
  return (
    <div>
      {optimisticPosts?.map(post => (
        <div key={post.id}>
          <p>
            {post.profile?.name}
            {post.profile?.username}
          </p>
          <p>{post.title}</p>
          <LikeButton post={post} addOptimisticPosts={addOptimisticPosts} />
        </div>
      ))}
    </div>
  );
};

export default PostsList;
