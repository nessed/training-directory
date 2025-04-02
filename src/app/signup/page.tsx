"use client";
import { Input, Button, Card, CardBody, CardHeader } from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "../../../utils/supabase/client";
type InputType = React.ChangeEvent<HTMLInputElement>;
export default function SignUp() {
  const supabase = createClient();
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: ""
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e:InputType) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    setErrorMsg("");
    setSuccessMsg("");

    const {error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg("Check your email to confirm your account.");
      setForm({ email: "", password: "", fullName: "" });
    }

  };
  const pushToLogin = () => {
    // setIsLoggedIn(false)
    router.push("/");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader className="flex flex-col items-center justify-center gap-2 py-6">
          <h1 className="text-2xl font-semibold text-blue-700">Create Your Account</h1>
          <p className="text-sm text-gray-500">Register</p>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 px-6 pb-6">
          <Input
            type="email"
            name="email"
            label="Email"
            value={form.email}
            onChange={handleChange}
            size="lg"
          />
          <Input
            type="password"
            name="password"
            label="Password"
            value={form.password}
            onChange={handleChange}
            size="lg"
          />

          <Button
            color="primary"
            className="w-full mt-4"
            size="lg"
            onClick={handleSignup}
          >
            Sign Up
          </Button>
          {errorMsg && <p className="text-red-600 text-sm text-center">{errorMsg}</p>}
          {successMsg && <p className="text-green-600 text-sm text-center">{successMsg}</p>}
          <p className="text-center text-sm text-gray-600 mt-2">
            Already have an account?
            <span onClick={pushToLogin} className="text-blue-600 cursor-pointer hover:underline"> Log In</span>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}