'use server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export const newPost = async (formData: FormData) => {
  try {
    const supabase = createServerComponentClient<Database>({ cookies });
    const title = String(formData.get('title'));
    const {
      data: { user },
    } = await supabase.auth.getUser();
    await supabase.from('posts').insert({ title, user_id: user?.id });
    revalidatePath('/');
  } catch (err) {
    console.error(err);
  }
};
