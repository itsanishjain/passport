"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUp, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { setCookie } from "@/lib/cookies";
import { useRouter } from "next/navigation";

type UploadStatus = "idle" | "uploading" | "success" | "error";

interface DocumentUpload {
  name: string;
  status: UploadStatus;
}

export default function InstructorOnboarding() {
  const router = useRouter();
  const [documents, setDocuments] = useState<DocumentUpload[]>([
    { name: "Driver's License", status: "idle" },
    { name: "Insurance Document", status: "idle" },
  ]);

  const simulateUpload = async (index: number) => {
    setDocuments((docs) =>
      docs.map((doc, i) =>
        i === index ? { ...doc, status: "uploading" } : doc
      )
    );

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setDocuments((docs) =>
      docs.map((doc, i) => (i === index ? { ...doc, status: "success" } : doc))
    );
  };

  const handleComplete = () => {
    setCookie("user_type", "instructor", { days: 365 });
    router.push("/home");
  };

  const handleSkip = () => {
    setCookie("user_type", "instructor", { days: 365 });
    router.push("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-purple-50 to-white">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Upload Your Documents
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {documents.map((doc, index) => (
            <div key={doc.name} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">{doc.name}</span>
                {doc.status === "success" && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                {doc.status === "error" && (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
              <Button
                onClick={() => simulateUpload(index)}
                disabled={
                  doc.status === "uploading" || doc.status === "success"
                }
                className="w-full"
                variant={doc.status === "success" ? "secondary" : "default"}
              >
                <FileUp className="w-4 h-4 mr-2" />
                {doc.status === "uploading"
                  ? "Uploading..."
                  : doc.status === "success"
                  ? "Uploaded"
                  : "Upload"}
              </Button>
            </div>
          ))}

          <div className="space-y-3 pt-4">
            <Button
              onClick={handleComplete}
              className="w-full"
              disabled={!documents.every((doc) => doc.status === "success")}
            >
              Complete & Continue
            </Button>
            <Button
              onClick={handleSkip}
              variant="ghost"
              className="w-full text-gray-500"
            >
              Skip for now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
