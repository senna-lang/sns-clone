import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import AuthButtonServer from '@/components/AuthButtonServer';
import { redirect } from 'next/navigation';
import PostForm from '@/components/Post';

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: posts } = await supabase.from('Posts').select();
  console.log(posts)
  const session = await supabase.auth.getSession();
  if (!session) {
    redirect('/login');
  }
  return (
    <div>
      <PostForm/>
      <AuthButtonServer />
    </div>
  );
}
