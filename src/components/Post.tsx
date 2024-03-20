'use client';

import { Button } from './ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import 'react-toastify/dist/ReactToastify.css';
import { usePostForm } from '@/hooks/usePostForm';

const PostForm = () => {
  const { form, onSubmit } = usePostForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="container flex flex-col gap-3"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>タイトル</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? '送信中' : '送信'}
        </Button>
      </form>
    </Form>
  );
};

export default PostForm;
