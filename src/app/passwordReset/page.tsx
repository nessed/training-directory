"use client";

import { useState } from "react";
import { Input, Button } from "@heroui/react";
import { createClient } from "../../../utils/supabase/client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function ResetPasswordPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleResetRequest = async () => {
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/updatePassword",
    });
    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg("Reset link sent! Check your email.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 to-white">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
      <Button
      isIconOnly
      variant="light"
      size="sm"
      className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 transition"
      onClick={() => router.push("/")}
    >
      <ArrowLeft className="w-5 h-5" />
    </Button>
        <h1 className="text-xl font-bold text-blue-700 mb-4 text-center">
          Reset Your Password
        </h1>
        <Input
          type="email"
          label="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          isLoading={loading}
          onClick={handleResetRequest}
          className="w-full mt-4 bg-blue-600 text-white"
        >
          Send Reset Link
        </Button>

        {errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}
        {successMsg && (
          <p className="text-green-600 text-sm mt-2">{successMsg}</p>
        )}
      </div>
    </div>
  );
}
