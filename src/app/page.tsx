"use client";
import { Input, Button, Card, CardBody, CardHeader } from "@heroui/react";
import { useState } from "react";
import { createClient } from "../../utils/supabase/client";
import { useRouter } from "next/navigation";
type InputEvent = React.ChangeEvent<HTMLInputElement>;

export default function initialPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const supabase = createClient();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (e:InputEvent) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSignin = async () => {
    setErrorMsg("");
    setSuccessMsg("");
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });
    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg("Logged in successfully.");
      setForm({ email: "", password: "" });
      // setIsLoggedIn(true)
      router.push("/table")
     }
  };
  const handleContinueAsGuest	= () => {
    // setIsLoggedIn(false)
    router.push("/table-non-login")
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader className="flex flex-col items-center justify-center gap-2 py-6">
          <h1 className="text-2xl font-semibold text-blue-700">Log in</h1>
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
          <div className="w-full flex justify-center">
            <div
              className="inline-block hover:cursor-pointer hover:text-blue-600 transition-colors"
              onClick={handleContinueAsGuest}
            >
              {`Continue without account?`}
            </div>
          </div>

          <Button
            color="primary"
            className="w-full mt-4"
            size="lg"
            onClick={handleSignin}          >
            Sign In

          </Button>
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
