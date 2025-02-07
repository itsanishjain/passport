"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Queries } from "@/lib/queries";
import { InstructorProfileType } from "@/lib/types/profile-api";

type User = Queries["user"];

export default function InstructorProfile({ user }: { user: User }) {
  const [profileData, setProfileData] = useState<InstructorProfileType>({
    bio: user?.instructorProfile?.bio || "",
    experienceYears: user?.instructorProfile?.experience_years || 0,
    hourlyRate: user?.instructorProfile?.hourly_rate || 0,
    licenseNumber: user?.instructorProfile?.license_number || "",
    vehicleType:
      (user?.instructorProfile?.vehicle_type as
        | "manual"
        | "automatic"
        | "both") || "manual",
    location: user?.instructorProfile?.location || "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch("/api/profile/instructor", {
        method: "POST",
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Instructor Profile</CardTitle>
          <CardDescription>
            Complete your profile to start accepting students
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell students about yourself and your teaching style"
              value={profileData.bio}
              onChange={(e) =>
                setProfileData({ ...profileData, bio: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="experienceYears">Years of Experience</Label>
              <Input
                id="experienceYears"
                type="number"
                value={profileData.experienceYears}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    experienceYears: parseInt(e.target.value),
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hourlyRate">Hourly Rate (£)</Label>
              <Input
                id="hourlyRate"
                type="number"
                value={profileData.hourlyRate}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    hourlyRate: parseInt(e.target.value),
                  })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="licenseNumber">License Number</Label>
            <Input
              id="licenseNumber"
              value={profileData.licenseNumber}
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  licenseNumber: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehicleType">Vehicle Type</Label>
            <Select
              value={profileData.vehicleType}
              onValueChange={(value) =>
                setProfileData({
                  ...profileData,
                  vehicleType: value as "manual" | "automatic" | "both",
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select vehicle type" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="manual">Manual</SelectItem>
                <SelectItem value="automatic">Automatic</SelectItem>
                <SelectItem value="both">Both</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Enter your teaching area"
              value={profileData.location}
              onChange={(e) =>
                setProfileData({ ...profileData, location: e.target.value })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading
          ? "Saving..."
          : user?.instructorProfile
          ? "Update Profile"
          : "Save Profile"}
      </Button>
    </form>
  );
}
