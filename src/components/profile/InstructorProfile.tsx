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
  InstructorProfileSchema,
  InstructorProfileType,
} from "@/lib/types/profile-api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";

type User = Queries["user"];

export default function InstructorProfile({ user }: { user: User }) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<InstructorProfileType>({
    resolver: zodResolver(InstructorProfileSchema),
    defaultValues: {
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
    },
  });

  const onSubmit = async (data: InstructorProfileType) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/profile/instructor", {
        method: user?.instructorProfile ? "PUT" : "POST",
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
              {...register("bio")}
            />
            {errors.bio && (
              <p className="text-sm text-red-500">{errors.bio.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="experienceYears">Years of Experience</Label>
              <Input
                id="experienceYears"
                type="number"
                {...register("experienceYears", { valueAsNumber: true })}
              />
              {errors.experienceYears && (
                <p className="text-sm text-red-500">
                  {errors.experienceYears.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="hourlyRate">Hourly Rate (£)</Label>
              <Input
                id="hourlyRate"
                type="number"
                {...register("hourlyRate", { valueAsNumber: true })}
              />
              {errors.hourlyRate && (
                <p className="text-sm text-red-500">
                  {errors.hourlyRate.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="licenseNumber">License Number</Label>
            <Input id="licenseNumber" {...register("licenseNumber")} />
            {errors.licenseNumber && (
              <p className="text-sm text-red-500">
                {errors.licenseNumber.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehicleType">Vehicle Type</Label>
            <Select
              value={watch("vehicleType")}
              onValueChange={(value) =>
                setValue(
                  "vehicleType",
                  value as "manual" | "automatic" | "both"
                )
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
            {errors.vehicleType && (
              <p className="text-sm text-red-500">
                {errors.vehicleType.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Enter your teaching area"
              {...register("location")}
            />
            {errors.location && (
              <p className="text-sm text-red-500">{errors.location.message}</p>
            )}
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
