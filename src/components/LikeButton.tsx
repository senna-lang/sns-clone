'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import React from 'react';

const LikeButton = ({ post }: { post: PostsWithAuthor }) => {
  const router = useRouter();
  const handleClick = async () => {
    const supabase = createClientComponentClient<Database>();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (post.user_has_liked_post) {
      await supabase
        .from('likes')
        .delete()
        .match({ user_id: user?.id, post_id: post.id });
    } else {
      await supabase
        .from('likes')
        .insert({ user_id: user?.id, post_id: post.id });
      router.refresh();
    }
  };
  return <button onClick={handleClick}>{post.likes}いいね</button>;
};

export default LikeButton;
