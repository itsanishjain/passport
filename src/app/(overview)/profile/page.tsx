import InstructorProfile from "@/components/profile/InstructorProfile";
import LearnerProfile from "@/components/profile/LearnerProfile";
import { getCookieFromHeader } from "@/lib/auth";
import { headers } from "next/headers";

export default function ProfilePage() {
  const userType = getCookieFromHeader("user_type", headers().get("cookie"));

  return (
    <div className="container max-w-2xl mx-auto p-4 pb-20">
      {userType === "instructor" ? <InstructorProfile /> : <LearnerProfile />}
    </div>
  );
}
