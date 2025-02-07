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
import {
  LearnerProfileSchema,
  LearnerProfileType,
} from "@/lib/types/profile-api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

type User = Queries["user"];

export default function LearnerProfile({ user }: { user: User }) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LearnerProfileType>({
    resolver: zodResolver(LearnerProfileSchema),
    defaultValues: {
      learningGoals: user?.learnerProfile?.learning_goals || "",
      preferredLocation: user?.learnerProfile?.preferred_location || "",
      preferredSchedule: user?.learnerProfile?.preferred_schedule || "",
      licenseType:
        (user?.learnerProfile?.license_type as "provisional" | "full") ||
        "provisional",
      experienceLevel:
        (user?.learnerProfile?.experience_level as
          | "beginner"
          | "intermediate"
          | "advanced") || "beginner",
    },
  });

  const onSubmit = async (data: LearnerProfileType) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/profile/learner", {
        method: user?.learnerProfile ? "PUT" : "POST",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to save profile");
      }
      toast({
        title: "Profile saved successfully",
        description: "Your profile has been updated",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to save profile",
        description: "Please try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              {...register("learningGoals")}
            />
            {errors.learningGoals && (
              <p className="text-sm text-red-500">
                {errors.learningGoals.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredLocation">Preferred Location</Label>
            <Input
              id="preferredLocation"
              placeholder="Where would you like to take lessons?"
              {...register("preferredLocation")}
            />
            {errors.preferredLocation && (
              <p className="text-sm text-red-500">
                {errors.preferredLocation.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredSchedule">Preferred Schedule</Label>
            <Input
              id="preferredSchedule"
              placeholder="e.g., Weekday evenings, Weekend mornings"
              {...register("preferredSchedule")}
            />
            {errors.preferredSchedule && (
              <p className="text-sm text-red-500">
                {errors.preferredSchedule.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="licenseType">License Type</Label>
            <Select
              value={watch("licenseType")}
              onValueChange={(value: "provisional" | "full") =>
                setValue("licenseType", value)
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
            {errors.licenseType && (
              <p className="text-sm text-red-500">
                {errors.licenseType.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="experienceLevel">Experience Level</Label>
            <Select
              value={watch("experienceLevel")}
              onValueChange={(
                value: "beginner" | "intermediate" | "advanced"
              ) => setValue("experienceLevel", value)}
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
            {errors.experienceLevel && (
              <p className="text-sm text-red-500">
                {errors.experienceLevel.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Profile"}
      </Button>
    </form>
  );
}
