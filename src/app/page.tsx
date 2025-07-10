"use client";

import { useState } from "react";
import Logger from "@/components/local-logger/logger";
import UserForm, { type FormData } from "@/components/local-logger/user-form";
import SubmittedData from "@/components/local-logger/submitted-data";
import PortInfo from "@/components/local-logger/port-info";

export default function Home() {
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const handleFormSubmit = (data: FormData) => {
    setSubmittedData(data);
    console.log("Form Submitted:", data);
  };

  return (
    <>
      <Logger />
      <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-8 md:p-12">
        <div className="w-full max-w-lg space-y-8">
          <header className="text-center">
            <h1 className="text-4xl font-headline font-bold text-foreground tracking-tight">
              Local Logger
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              A simple tool to log data and display information.
            </p>
          </header>

          <UserForm onSubmit={handleFormSubmit} />

          {submittedData && <SubmittedData data={submittedData} />}

          <PortInfo />
        </div>
      </main>
    </>
  );
}
