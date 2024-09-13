import { fetchAuthUserAction } from "@/actions";
import Logout from "@/components/log-out";
import { redirect } from "next/navigation";

export default async function Home() {
  const currentUser = await fetchAuthUserAction();
  //console.log(currentUser);
  if (!currentUser.success) redirect("/sign-in");

  return (
    <main className="text-2xl font-semibold p-5">
      <h1 className="text-3xl font-bold">Next JS Authentication</h1>
      <h1>Welcome, {currentUser?.data?.userName}!</h1>
      <h2>Email: {currentUser?.data?.email}!</h2>
      <Logout />
    </main>
  );
}
