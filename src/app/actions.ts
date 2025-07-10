'use server';

import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  age: z.coerce
    .number({ invalid_type_error: 'Please enter a valid age.' })
    .int()
    .positive({ message: 'Age must be a positive number.' })
    .min(1, { message: 'Age must be at least 1.' }),
});

export async function handleFormAction(data: FormData) {
  const name = data.get('name') as string;
  const age = data.get('age') as string;

  const validation = formSchema.safeParse({ name, age });

  if (validation.success) {
    console.log('Form Submitted on Server:', validation.data);
    return {
      message: 'Data submitted successfully!',
      data: validation.data,
    };
  } else {
    console.error('Server-side validation failed:', validation.error.flatten());
    return {
      message: 'Validation failed.',
      errors: validation.error.flatten().fieldErrors,
    };
  }
}
