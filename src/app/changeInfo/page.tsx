"use client";
import {
  Input,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../utils/supabase/client";
type InputType = React.ChangeEvent<HTMLInputElement>;
export default function SignUp() {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const supabase = createClient();
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
  });
  const [isEmailOpen, setIsEmailOpen] = useState(false);

  const handleEmailChange = async () => {
    setSuccessMsg("");
    setErrorMsg("");
    const { error } = await supabase.auth.updateUser({
      email: form.email,
    });
    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg("Email updated successfully.");
      setForm({ email: "", password: "", fullName: "" });
      router.refresh(); 
      window.location.reload();


    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 text-gray-800 flex flex-col items-center justify-center px-4 py-10">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Update Your Info
        </h1>

        <div className="flex flex-col gap-4">
          <Button
            onPress={() => setIsEmailOpen(true)}
            size="lg"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Change Email Address
          </Button>
          <Modal isOpen={isEmailOpen} onOpenChange={setIsEmailOpen}>
            <ModalContent>
              <ModalHeader>Change Email Address</ModalHeader>
              <ModalBody>
                <Input
                  onChange={(e: InputType) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  type="email"
                  name="email"
                  label="New Email"
                  size="lg"
                />
              </ModalBody>
                {successMsg && (
                    <p className="text-green-500 text-sm mt-2 text-center">Email update confirmation sent to email</p>

                )}
                {errorMsg && (
                    <p className="text-red-500 text-sm mt-2">{errorMsg}</p>
                )}
              <ModalFooter>
                <Button variant="flat" onPress={() => setIsEmailOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onPress={handleEmailChange}
                  className="bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Change Email
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          {/* <Button
            size="lg"
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Reset Password
          </Button> */}
        </div>
      </div>
    </div>
  );
}
