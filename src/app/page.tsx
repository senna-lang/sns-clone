import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import AuthButtonServer from '@/components/AuthButtonServer';

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data: posts } = await supabase.from('Posts').select();
  // console.log(posts)
  return (
    <div>
      <AuthButtonServer />
    </div>
  );
}
