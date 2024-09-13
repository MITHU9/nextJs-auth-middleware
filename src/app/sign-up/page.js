"use client";

import { Label } from "@/components/ui/label";
import { formControls, initialFormFields } from "../utils";
import { useState } from "react";
import CommonFormElement from "@/components/form-element";
import { Button } from "@/components/ui/button";
import { registerUserAction } from "@/actions";
import { useRouter } from "next/navigation";

function SignUp() {
  const [signUpFormData, setSignUpFormData] = useState(initialFormFields);
  //console.log(signUpFormData);
  const router = useRouter();

  async function handleSignUp() {
    const result = await registerUserAction(signUpFormData);
    console.log(result);

    if (result?.data) router.push("/sign-in");
  }

  return (
    <div className="w-3/12 mx-auto p-3 mt-6 bg-blue-500 rounded-md text-black">
      <h1>Registration</h1>
      <form action={handleSignUp}>
        {formControls.map((controlItem) => (
          <div className="flex flex-col gap-4 mt-1" key={controlItem.name}>
            <Label>{controlItem.label}</Label>
            <CommonFormElement
              value={signUpFormData[controlItem.name]}
              onChange={(e) =>
                setSignUpFormData({
                  ...signUpFormData,
                  [controlItem.name]: e.target.value,
                })
              }
              currentItem={controlItem}
            />
          </div>
        ))}
        <Button className="mt-2" type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default SignUp;
