'use client';
import React, { useEffect, useOptimistic } from 'react';
import LikeButton from './LikeButton';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { channel } from 'diagnostics_channel';

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

  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const channel = supabase
      .channel('realtime posts')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'posts',
        },
        payload => {
          router.refresh();
          console.log(payload)
        }
      )
      .subscribe();
      return () => {
        supabase.removeChannel(channel)
      }
  }, [supabase,router]);

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
