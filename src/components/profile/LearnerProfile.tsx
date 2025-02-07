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

interface LearnerProfileData {
  learningGoals: string;
  preferredLocation: string;
  preferredSchedule: string;
  licenseType: string;
  experienceLevel: string;
}

export default function LearnerProfile() {
  const [profileData, setProfileData] = useState<LearnerProfileData>({
    learningGoals: "",
    preferredLocation: "",
    preferredSchedule: "",
    licenseType: "",
    experienceLevel: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement profile update logic
    console.log("Profile data:", profileData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Learner Profile</CardTitle>
          <CardDescription>
            Tell us about your learning preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="learningGoals">Learning Goals</Label>
            <Textarea
              id="learningGoals"
              placeholder="What do you want to achieve from your driving lessons?"
              value={profileData.learningGoals}
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  learningGoals: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredLocation">Preferred Location</Label>
            <Input
              id="preferredLocation"
              placeholder="Where would you like to take lessons?"
              value={profileData.preferredLocation}
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  preferredLocation: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredSchedule">Preferred Schedule</Label>
            <Input
              id="preferredSchedule"
              placeholder="e.g., Weekday evenings, Weekend mornings"
              value={profileData.preferredSchedule}
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  preferredSchedule: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="licenseType">License Type</Label>
            <Select
              value={profileData.licenseType}
              onValueChange={(value) =>
                setProfileData({ ...profileData, licenseType: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select license type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="provisional">Provisional</SelectItem>
                <SelectItem value="full">Full</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="experienceLevel">Experience Level</Label>
            <Select
              value={profileData.experienceLevel}
              onValueChange={(value) =>
                setProfileData({ ...profileData, experienceLevel: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full">
        Save Profile
      </Button>
    </form>
  );
}
