"use client";

import { Label } from "@/components/ui/label";
import { initialLoginFormFields, userLoginForm } from "../utils";
import CommonFormElement from "@/components/form-element";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { logInUserAction } from "@/actions";
import { useRouter } from "next/navigation";

function SignIn() {
  const [signInFormData, setSignInFormData] = useState(initialLoginFormFields);

  const router = useRouter();

  async function handleSignIn() {
    const result = await logInUserAction(signInFormData);
    console.log(result);
    if (result?.success) {
      router.push("/");
    }
  }

  return (
    <div className="w-3/12 mx-auto p-3 mt-6 bg-blue-500 rounded-md text-black">
      <h1>Login</h1>
      <form action={handleSignIn}>
        {userLoginForm.map((controlItem) => (
          <div className="flex flex-col gap-4 mt-1" key={controlItem.name}>
            <Label>{controlItem.label}</Label>
            <CommonFormElement
              value={setSignInFormData[controlItem.name]}
              currentItem={controlItem}
              onChange={(e) =>
                setSignInFormData({
                  ...signInFormData,
                  [controlItem.name]: e.target.value,
                })
              }
            />
          </div>
        ))}
        <Button className="mt-2" type="submit">
          Sign In
        </Button>
      </form>
    </div>
  );
}

export default SignIn;
