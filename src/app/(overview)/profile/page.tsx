import InstructorProfile from "@/components/profile/InstructorProfile";
import LearnerProfile from "@/components/profile/LearnerProfile";
import { headers } from "next/headers";

export default function ProfilePage() {
  // Get the cookie value on the server side
  const cookies = headers().get("cookie");
  let userType = cookies
    ?.split("; ")
    .find((row) => row.startsWith("user_type="))
    ?.split("=")[1];

  if (userType) {
    userType = decodeURIComponent(userType);
  }

  return (
    <div className="container max-w-2xl mx-auto p-4 pb-20">
      {userType === "instructor" ? <InstructorProfile /> : <LearnerProfile />}
    </div>
  );
}
