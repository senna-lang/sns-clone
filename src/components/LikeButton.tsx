'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react';

const LikeButton = ({
  post,
  addOptimisticPosts,
}: {
  post: PostsWithAuthor;
  addOptimisticPosts: (newPost: PostsWithAuthor) => void;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleClick = async () => {
    const supabase = createClientComponentClient<Database>();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (post.user_has_liked_post) {
      addOptimisticPosts({
        ...post,
        likes: post.likes - 1,
        user_has_liked_post: !post.user_has_liked_post,
      });
      await supabase
        .from('likes')
        .delete()
        .match({ user_id: user?.id, post_id: post.id });
    } else {
      addOptimisticPosts({
        ...post,
        likes: post.likes + 1,
        user_has_liked_post: !post.user_has_liked_post,
      });
      await supabase
        .from('likes')
        .insert({ user_id: user?.id, post_id: post.id });
    }
    router.refresh();
  };
  return (
    <button onClick={() => startTransition(() => handleClick())}>
      {post.likes}いいね
    </button>
  );
};

export default LikeButton;
