import InstructorProfile from "@/components/profile/InstructorProfile";
import LearnerProfile from "@/components/profile/LearnerProfile";
import { getCookieFromHeader } from "@/lib/auth";
import { headers } from "next/headers";
import QUERIES from "@/lib/queries";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const userType = getCookieFromHeader("user_type", headers().get("cookie"));
  const userId = getCookieFromHeader("user_id", headers().get("cookie"));
  const walletAddress = getCookieFromHeader(
    "wallet_address",
    headers().get("cookie")
  );

  if (!userId || !walletAddress || !userType) {
    redirect("/");
  }

  console.log(userType, userId, walletAddress);

  const user = await QUERIES.user(userId, userType);

  if (!user) {
    redirect("/");
  }

  return (
    <div className="container max-w-2xl mx-auto p-4 pb-20">
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      {userType === "instructor" ? (
        <InstructorProfile user={user} />
      ) : (
        <LearnerProfile user={user} />
      )}
    </div>
  );
}
