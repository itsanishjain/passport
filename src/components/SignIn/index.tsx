// "use client";
// import { signIn, signOut, useSession } from "next-auth/react";

// export const SignIn = () => {
//   const { data: session } = useSession();
//   if (session) {
//     return (
//       <>
//         Signed in as {session?.user?.name?.slice(0, 10)} <br />
//         <button onClick={() => signOut()}>Sign out</button>
//       </>
//     );
//   } else {
//     return (
//       <>
//         Not signed in <br />
//         <button onClick={() => signIn()}>Sign in</button>
//       </>
//     );
//   }
// };

"use client";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";

export const SignIn = () => {
  // const { status } = useSession();
  // const router = useRouter();

  const handleSignIn = () => {
    signIn("worldcoin", {
      callbackUrl: "/home",
      redirect: true,
    });
  };

  // if (status === "loading") {
  //   return <div>Loading...</div>;
  // }

  // if (status === "authenticated") {
  //   router.push("/home");
  // }

  return (
    <div className="">
      <Button onClick={handleSignIn}>Sign in with Worldcoin</Button>
    </div>
  );
};
