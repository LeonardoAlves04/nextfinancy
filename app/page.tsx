import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { dark } from "@clerk/themes";
import { redirect } from "next/navigation";
import Navbar from "./_components/navbar";

const Home = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("login");
  }

  return <Navbar />;
};

export default Home;
