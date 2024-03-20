import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import AuthButtonServer from '@/components/AuthButtonServer';
import { redirect } from 'next/navigation';
import { PostFormButton } from '@/components/PostFormButton';
import PostsList from '@/components/PostsList';

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase
    .from('posts')
    .select('*, profile(*),likes(*)');
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const posts =
    data?.map(post => ({
      ...post,
      profile: Array.isArray(post.profile) ? post.profile[0] : post.profile,
      user_has_liked_post: !!post.likes.find(
        like => like.user_id === session?.user.id
      ),
      likes: post.likes.length,
    })) ?? [];
  console.log(posts);
  if (!session) {
    redirect('/login');
  }
  return (
    <div className="w-full">
      <div className=" flex flex-col items-center justify-center">
        <PostFormButton />
        <div className=" fixed top-10 right-20">
          <AuthButtonServer />
        </div>
        <PostsList posts={posts} />
      </div>
    </div>
  );
}
