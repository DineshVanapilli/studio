"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Server, FileCode, Info } from 'lucide-react';
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function PortInfo() {
  const [appPort, setAppPort] = useState<string | null>(null);

  useEffect(() => {
    // This hook ensures the code runs only on the client-side,
    // preventing hydration mismatches.
    setAppPort(window.location.port || '80');
  }, []);

  return (
    <Card className="w-full shadow-md">
        <CardHeader>
            <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-accent"/>
                <CardTitle className="font-headline">Application Info</CardTitle>
            </div>
            <CardDescription>
                Access details for your running application.
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
                <Server className="h-5 w-5 text-muted-foreground mt-1" />
                <div className="flex-1">
                    <p className="font-semibold">Application URL</p>
                    {appPort ? (
                      <a href={`http://localhost:${appPort}`} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-sm break-all">
                          http://localhost:{appPort}
                      </a>
                    ) : (
                      <Skeleton className="h-5 w-48 mt-1" />
                    )}
                </div>
            </div>
            <div className="flex items-start gap-4">
                <FileCode className="h-5 w-5 text-muted-foreground mt-1" />
                <div className="flex-1">
                    <p className="font-semibold">API Documentation</p>
                    <p className="text-muted-foreground text-sm">
                        For a full-stack app, docs (e.g., Swagger) might be at <code className="font-mono bg-muted px-1 py-0.5 rounded text-xs">/api-docs</code>.
                    </p>
                </div>
            </div>
        </CardContent>
    </Card>
  );
}
