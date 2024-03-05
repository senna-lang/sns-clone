import { Database as SupabaseDB } from './lib/database.types';
declare global {
  type Database = SupabaseDB;
  type Post = Database['public']['Tables']['posts']['Row'];
  type Profile = Database['public']['Tables']['profile']['Row'];

  type PostsWithAuthor = Post & {
    profile: Profile;
    likes: number;
    user_has_liked_post: boolean;
  };
}
