'use server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const newPost = async (formData: FormData) => {
  try {
    const supabase = createServerComponentClient({ cookies });
    const title = formData.get('title');
    const {
      data: { user },
    } = await supabase.auth.getUser();
    await supabase.from('posts').insert({ title, user_id: user?.id });
  } catch (err) {
    console.error(err);
  }
};
