import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type FormData } from "./user-form";
import { User, Hash } from 'lucide-react';

interface SubmittedDataProps {
  data: FormData;
}

export default function SubmittedData({ data }: SubmittedDataProps) {
  return (
    <Card className="w-full bg-primary/10 border-primary/20 animate-in fade-in duration-500">
      <CardHeader>
        <CardTitle className="font-headline">Submitted Data</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-md">
        <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-primary" />
            <p><span className="font-semibold text-muted-foreground">Name:</span> <span className="font-medium text-foreground">{data.name}</span></p>
        </div>
        <div className="flex items-center gap-3">
            <Hash className="h-5 w-5 text-primary" />
            <p><span className="font-semibold text-muted-foreground">Age:</span> <span className="font-medium text-foreground">{data.age}</span></p>
        </div>
      </CardContent>
    </Card>
  );
}
