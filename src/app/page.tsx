import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import AuthButtonServer from '@/components/AuthButtonServer';
import { redirect } from 'next/navigation';
import PostForm from '@/components/Post';
import PostsList from '@/components/PostsList';

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: posts } = await supabase.from('posts').select('*, profile(*)');
  const session = await supabase.auth.getSession();
  console.log(posts);
  if (!session) {
    redirect('/login');
  }
  return (
    <div>
      <PostForm />
      <AuthButtonServer />
      <PostsList posts={posts} />
    </div>
  );
}
