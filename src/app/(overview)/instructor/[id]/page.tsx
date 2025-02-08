import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReviewsTab } from "@/components/Instructor/reviews";
import { AvailabilityTab } from "@/components/Instructor/availability";
import QUERIES from "@/lib/queries";
import { VerificationIcon } from "@/components/VerificationIcon";

export default async function InstructorProfile({
  params,
}: {
  params: { id: string };
}) {
  const id = await Promise.resolve(params.id);
  console.log(id);
  const instructor = await QUERIES.getInstructor(id);
  console.log(instructor);

  if (!instructor) {
    return <div>Instructor not found</div>;
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Profile Header - Fixed size */}

      <div className="bg-black px-4 pt-6 pb-6 flex-none">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full border-2 border-white overflow-hidden">
            <Image
              src="/assets/avatar-women-placeholder.png"
              alt="Sarah Wilson"
              width={80}
              height={80}
              className="object-cover"
            />
          </div>
          <div className="text-white">
            <h1 className="text-xl font-semibold">{instructor?.name}</h1>
            <p className="text-sm text-gray-300">
              Professional Driving Instructor
            </p>
            <div className="flex items-center mt-1 space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span>4.9</span>
              <span className="text-gray-400">•</span>
              <span>423 lessons</span>
            </div>
            <VerificationIcon type="orb" />
          </div>
        </div>
      </div>

      {/* Stats Section - Fixed size */}
      <div className="px-4 py-4 bg-white border-b flex-none">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Hourly Rate</p>
            <p className="font-semibold">
              £{instructor?.instructorProfile?.hourly_rate}/hour
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Experience</p>
            <p className="font-semibold">8 years</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Pass Rate</p>
            <p className="font-semibold">92%</p>
          </div>
        </div>
        <Link href={`/booking/${id}`}>
          <Button className="w-full mt-4">Book a Lesson</Button>
        </Link>
      </div>

      {/* Tabs Section - Takes remaining height */}
      <div className="flex-1 flex flex-col min-h-0">
        <Tabs defaultValue="about" className="flex-1 flex flex-col">
          {/* Tab headers - Fixed position */}
          <div className="bg-white border-b flex-none">
            <TabsList className="grid w-full grid-cols-3 bg-transparent">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>
          </div>

          {/* Tab content - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            <TabsContent value="about" className="h-full p-4 m-0">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold mb-2">Qualifications</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">ADI Certified</Badge>
                    <Badge variant="secondary">Pass Plus Registered</Badge>
                    <Badge variant="secondary">First Aid Trained</Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-2">About Me</h3>
                  <p className="text-sm text-gray-600">
                    Passionate about helping learners become confident, safe
                    drivers. I specialize in nervous learners and offer both
                    manual and automatic lessons. My teaching style is patient
                    and adaptable to each student&apos;s needs.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-2">Teaching Areas</h3>
                  <p className="text-sm text-gray-600">
                    Birmingham City Centre, Solihull, Edgbaston, Moseley, Kings
                    Heath
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-2">Vehicle</h3>
                  <p className="text-sm text-gray-600">
                    2022 Ford Fiesta - Dual controlled, air conditioned,
                    regularly serviced and maintained
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="h-full p-4 m-0">
              <ReviewsTab />
            </TabsContent>

            <TabsContent value="schedule" className="h-full p-4 m-0">
              <AvailabilityTab />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
