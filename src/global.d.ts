import { Database as SupabaseDB } from './lib/database.types';
declare global {
  type Database = SupabaseDB;
}
