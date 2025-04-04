'use client';

import { useState, useEffect } from 'react';
import { Input, Button } from '@heroui/react';
import { createClient } from '../../../utils/supabase/client';
import { useRouter } from "next/navigation";

export default function UpdatePasswordPage() {
  const supabase = createClient();
  const [newPassword, setNewPassword] = useState('');
  const [sessionExists, setSessionExists] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setSessionExists(true);
      } else {
        setErrorMsg('Link expired or invalid. Please request another reset.');
      }
    };
    checkSession();
  }, []);

  const handlePasswordUpdate = async () => {
    setErrorMsg('');
    setSuccessMsg('');
  
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
  
    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg('Password updated successfully. Redirecting...');
      setNewPassword('');
  
  
        router.push('/table');
 
    }
  };

  if (!sessionExists) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-slate-50">
      <p className="text-blue-700 text-lg font-semibold">
        Checking session...
      </p>
    </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-50 to-white">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
        <h1 className="text-xl font-bold text-blue-700 mb-4 text-center">Set New Password</h1>
        <Input
          type="password"
          label="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button onClick={handlePasswordUpdate} className="w-full mt-4 bg-blue-600 text-white">
          Update Password
        </Button>

        {errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}
        {successMsg && <p className="text-green-600 text-sm mt-2">{successMsg}</p>}
      </div>
    </div>
  );
}
