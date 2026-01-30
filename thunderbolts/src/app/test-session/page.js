"use client";
import { useSession } from "next-auth/react";

export default function DebugSession() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading session...</div>;

  return (
    <div className="p-8">
      <h1>Session Debug</h1>
      <pre className="bg-gray-100 p-4 rounded overflow-auto">
        {JSON.stringify({ status, session }, null, 2)}
      </pre>
    </div>
  );
}