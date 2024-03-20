'use client';
import React, { useEffect, useOptimistic } from 'react';
import LikeButton from './LikeButton';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

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
          // console.log(payload);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);

  return (
    <div className=" grid grid-cols-2 items-center gap-2">
      {optimisticPosts?.map(post => (
        <Card key={post.id} className="w-[350px]">
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <LikeButton post={post} addOptimisticPosts={addOptimisticPosts} />
          </CardContent>
          <CardFooter>
            <p>{post.created_at.split('T')[0]}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PostsList;
