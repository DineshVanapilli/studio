"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Send } from 'lucide-react';
import { handleFormAction } from "@/app/actions";
import { useTransition } from "react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  age: z.coerce.number({invalid_type_error: "Please enter a valid age."}).int().positive({ message: "Age must be a positive number." }).min(1, { message: "Age must be at least 1." }),
});

export type FormData = z.infer<typeof formSchema>;

interface UserFormProps {
  onServerSubmit: (data: FormData) => void;
}

export default function UserForm({ onServerSubmit }: UserFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: undefined,
    },
  });

  const onSubmit = (formData: FormData) => {
    const data = new FormData();
    data.append('name', formData.name);
    data.append('age', String(formData.age));

    startTransition(async () => {
      const result = await handleFormAction(data);
      if (result.data) {
        onServerSubmit(result.data);
        form.reset();
      } else if (result.errors) {
        if (result.errors.name) {
          form.setError('name', { message: result.errors.name[0] });
        }
        if (result.errors.age) {
          form.setError('age', { message: result.errors.age[0] });
        }
      }
    });
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle className="font-headline">User Input</CardTitle>
        <CardDescription>Enter your name and age, then press submit.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Jane Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g. 30" {...field} value={field.value ?? ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              <Send className="mr-2 h-4 w-4" />
              {isPending ? 'Submitting...' : 'Submit'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
