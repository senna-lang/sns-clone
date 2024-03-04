import { z } from 'zod';

export const formSchema = z.object({
  title: z.string().min(5, { message: '5文字以上で入力してください。' }),
});
