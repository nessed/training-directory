"use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function ErrorComp() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 flex items-center justify-center">
      <div className="bg-white p-10 rounded-3xl shadow-lg border border-blue-100 max-w-md w-full text-center space-y-6">
        <h1 className="text-2xl font-bold text-blue-800">Access Restricted</h1>
        <p className="text-gray-600 text-md">
          Please login to continue and access the trainer dashboard.
        </p>

        <div className="space-y-3">
          <Button
            size="lg"
            className="bg-blue-500 text-white w-full hover:bg-blue-600 transition-all"
            onPress={() => {
              router.push("/");
            }}
          >
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
}
