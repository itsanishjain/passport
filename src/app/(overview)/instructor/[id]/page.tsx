import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star } from "lucide-react";
import Image from "next/image";

export default async function InstructorProfile({
  params,
}: {
  params: { id: string };
}) {
  const id = await Promise.resolve(params.id);
  console.log(id);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-black px-4 pt-6 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full border-2 border-white overflow-hidden">
            <Image
              src="/assets/avatar-placeholder-women.png"
              alt="Sarah Wilson"
              width={80}
              height={80}
              className="object-cover"
            />
          </div>
          <div className="text-white">
            <h1 className="text-xl font-semibold">Sarah Wilson</h1>
            <p className="text-sm text-gray-300">
              Professional Driving Instructor
            </p>
            <div className="flex items-center mt-1 space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span>4.9</span>
              <span className="text-gray-400">•</span>
              <span>423 lessons</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-4 py-4 bg-white border-b">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Hourly Rate</p>
            <p className="font-semibold">£35/hour</p>
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
        <Button className="w-full mt-4">Book a Lesson</Button>
      </div>

      {/* Tabs Section */}
      <div className="mt-4 px-4 bg-gray-50">
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-transparent">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="mt-4">
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
                  manual and automatic lessons. My teaching style is patient and
                  adaptable to each student&apos;s needs.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2">Teaching Areas</h3>
                <p className="text-sm text-gray-600">
                  Birmingham City Centre, Solihull, Edgbaston, Moseley, Kings
                  Heath
                </p>
                <div>
                  <h3 className="text-sm font-semibold mb-2">Vehicle</h3>
                  <p className="text-sm text-gray-600">
                    2022 Ford Fiesta - Dual controlled, air conditioned,
                    regularly serviced and maintained
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-2">Lesson Types</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Manual</Badge>
                    <Badge variant="secondary">Automatic</Badge>
                    <Badge variant="secondary">Intensive Courses</Badge>
                    <Badge variant="secondary">Pass Plus</Badge>
                    <Badge variant="secondary">Refresher Lessons</Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-2">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">English</Badge>
                    <Badge variant="secondary">Urdu</Badge>
                    <Badge variant="secondary">Hindi</Badge>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
