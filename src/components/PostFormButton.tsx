'use client';
import { useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
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
import { ToastContainer, toast } from 'react-toastify';
import { usePostForm } from '@/hooks/usePostForm';
import { AlertDialogAction } from '@radix-ui/react-alert-dialog';

export function PostFormButton() {
  const { form, onSubmit } = usePostForm();

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      toast.success('投稿完了');
      form.reset();
    }
  }, [form.formState.isSubmitSuccessful]);
  return (
    <div className=" fixed bottom-20 right-20">
      <ToastContainer />
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>投稿</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
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
              <AlertDialogAction
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                <Button size="lg">
                  {form.formState.isSubmitting ? '送信中' : '送信'}
                </Button>
              </AlertDialogAction>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
