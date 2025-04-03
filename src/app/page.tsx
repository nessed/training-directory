"use client";
import { Input, Button, Card, CardBody, CardHeader } from "@heroui/react";
import { useState } from "react";
import { createClient } from "../../utils/supabase/client";
import { useRouter } from "next/navigation";
type InputEvent = React.ChangeEvent<HTMLInputElement>;

export default function InitialPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const supabase = createClient();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (e: InputEvent) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleResetPassword = async () => {
    setErrorMsg("");
    setSuccessMsg("");
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://example.com/update-password",
    });
    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg("Reset link sent successfully.");
      setForm({ email: "", password: "" });
    }
  };

  const handleContinueAsGuest = () => {
    // setIsLoggedIn(false)
    router.push("/table-non-login");
  };
  const signUpRedirect = () => {
    // setIsLoggedIn(false)
    router.push("/signup");
  };

  const handleSignin = async () => {
    setErrorMsg("");
    setSuccessMsg("");
    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });
    if (error) {
      setErrorMsg(error.message);
      console.log("User session:", data.session);
    } else {
      setSuccessMsg("Logged in successfully.");
      console.log("User session:", data.session);
      setForm({ email: "", password: "" });
      // setIsLoggedIn(true)
      router.push("/table");
    }
  };
 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader className="flex flex-col items-center justify-center gap-2 py-6">
          <h1 className="text-2xl font-semibold text-blue-700">Log in</h1>
          <p className="text-sm text-gray-500">Welcome back, please sign in</p>
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
          <div className="w-full flex justify-center">
            <div
              className="inline-block hover:cursor-pointer text-md text-blue-700 hover:underline transition-colors"
              onClick={handleContinueAsGuest}
            >
              Continue without account?
            </div>
          </div>
          <div className="w-full flex justify-center">
            <div
              className="inline-block hover:cursor-pointer text-blue-700 hover:underline transition-colors text-md"
              onClick={signUpRedirect}
            >
              Sign up
            </div>
          </div>

          <Button
            color="primary"
            className="w-full mt-4"
            size="lg"
            onClick={handleSignin}
          >
            Sign In
          </Button>
          <div className="w-full flex justify-center">
            <div
              className="inline-block hover:cursor-pointer text-blue-700 hover:underline transition-colors text-md"
              onClick={handleResetPassword}
            >
              Reset your password{" "}
            </div>
          </div>
          {errorMsg && (
            <p className="text-red-600 text-sm text-center">{errorMsg}</p>
          )}
          {successMsg && (
            <p className="text-green-600 text-sm text-center">{successMsg}</p>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
