import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '@/lib/schema';
import { useCallback } from 'react';
import { z } from 'zod';
import { newPost } from '@/actions/actions';

export const usePostForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = useCallback(
    async values => {
      const { title } = values;
      const formData = new FormData();
      formData.append('title', title);
      newPost(formData);
    },
    []
  );

  return { form, onSubmit };
};
