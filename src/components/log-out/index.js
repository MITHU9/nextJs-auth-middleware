"use client";

import { logOutUserAction } from "@/actions";
import { Button } from "../ui/button";

function Logout() {
  async function handleLogout() {
    await logOutUserAction();
    console.log("logout");
  }

  return <Button onClick={handleLogout}>Logout</Button>;
}

export default Logout;
