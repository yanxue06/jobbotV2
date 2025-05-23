import React, { useState } from "react";
import { Upload, FileText, AlertCircle, CheckCircle, X } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ResumeAnalyzerProps {
  jobDescription?: string;
  onRequestJobDescription?: () => void;
}

const ResumeAnalyzer: React.FC<ResumeAnalyzerProps> = ({
  jobDescription = "",
  onRequestJobDescription = () => {},
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<{
    compatibilityScore: number;
    missingKeywords: string[];
    improvementSuggestions: { category: string; suggestions: string[] }[];
    matchedKeywords: string[];
  } | null>(null);

  // Mock analysis results for UI demonstration
  const mockAnalysisResults = {
    compatibilityScore: 72,
    missingKeywords: [
      "Docker",
      "Kubernetes",
      "CI/CD",
      "AWS",
      "Agile methodology",
    ],
    matchedKeywords: [
      "React",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Node.js",
      "REST API",
    ],
    improvementSuggestions: [
      {
        category: "Technical Skills",
        suggestions: [
          "Add experience with containerization technologies like Docker and Kubernetes",
          "Include cloud platform experience, particularly with AWS",
          "Highlight any experience with CI/CD pipelines",
        ],
      },
      {
        category: "Experience Description",
        suggestions: [
          "Quantify your achievements with metrics and specific outcomes",
          "Use more action verbs to describe your responsibilities",
          "Align your experience descriptions with the job requirements",
        ],
      },
      {
        category: "Resume Structure",
        suggestions: [
          "Consider adding a skills section at the top of your resume",
          "Ensure your most relevant experience is prominently featured",
        ],
      },
    ],
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    setAnalysisComplete(false);
    setAnalysisResults(null);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (
      droppedFile &&
      (droppedFile.type === "application/pdf" ||
        droppedFile.type === "application/msword" ||
        droppedFile.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      setFile(droppedFile);
      setAnalysisComplete(false);
      setAnalysisResults(null);
    }
  };

  const analyzeResume = () => {
    if (!file) return;

    if (!jobDescription) {
      onRequestJobDescription();
      return;
    }

    setIsAnalyzing(true);

    // Simulate API call with timeout
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      setAnalysisResults(mockAnalysisResults);
    }, 2000);
  };

  const resetAnalysis = () => {
    setFile(null);
    setAnalysisComplete(false);
    setAnalysisResults(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-xl">
      <Card className="w-full shadow-sm border-gray-100">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Resume Analyzer
          </CardTitle>
          <CardDescription className="text-gray-600">
            Upload your resume to get AI-powered analysis and improvement
            suggestions based on job requirements.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {!analysisComplete ? (
            <div className="space-y-6">
              {!jobDescription && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Job description required</AlertTitle>
                  <AlertDescription>
                    Please provide a job description first to compare your
                    resume against.
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={onRequestJobDescription}
                    >
                      Add Job Description
                    </Button>
                  </AlertDescription>
                </Alert>
              )}

              <div
                className="border-2 border-dashed rounded-lg p-10 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() =>
                  document.getElementById("resume-upload")?.click()
                }
              >
                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleFileChange}
                />

                <div className="flex flex-col items-center justify-center gap-2">
                  <Upload className="h-12 w-12 text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-700">
                    Upload your resume
                  </h3>
                  <p className="text-sm text-gray-500 max-w-md">
                    Drag and drop your resume file here, or click to browse.
                    Supported formats: PDF, DOC, DOCX
                  </p>
                </div>
              </div>

              {file && (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-blue-500" />
                    <div>
                      <p className="font-medium text-gray-700">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={resetAnalysis}
                    >
                      <X className="h-4 w-4 mr-1" /> Remove
                    </Button>
                    <Button
                      onClick={analyzeResume}
                      disabled={isAnalyzing || !jobDescription}
                    >
                      {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
                    </Button>
                  </div>
                </div>
              )}

              {isAnalyzing && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-600">
                    Analyzing your resume...
                  </p>
                  <Progress value={45} className="h-2" />
                </div>
              )}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800">
                  Analysis Results
                </h3>
                <Button variant="outline" size="sm" onClick={resetAnalysis}>
                  <Upload className="h-4 w-4 mr-2" /> Upload New Resume
                </Button>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-medium text-gray-700">
                      Compatibility Score
                    </h4>
                    <p className="text-sm text-gray-500">
                      How well your resume matches the job requirements
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative h-24 w-24">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-blue-600">
                          {analysisResults?.compatibilityScore || 0}%
                        </span>
                      </div>
                      <svg className="h-24 w-24" viewBox="0 0 100 100">
                        <circle
                          className="text-gray-200"
                          strokeWidth="8"
                          stroke="currentColor"
                          fill="transparent"
                          r="40"
                          cx="50"
                          cy="50"
                        />
                        <circle
                          className="text-blue-600"
                          strokeWidth="8"
                          strokeDasharray={251.2}
                          strokeDashoffset={
                            251.2 -
                            (251.2 *
                              (analysisResults?.compatibilityScore || 0)) /
                              100
                          }
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                          r="40"
                          cx="50"
                          cy="50"
                        />
                      </svg>
                    </div>
                    <div>
                      {(analysisResults?.compatibilityScore || 0) >= 80 ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                          Strong Match
                        </Badge>
                      ) : (analysisResults?.compatibilityScore || 0) >= 60 ? (
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                          Good Match
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
                          Needs Improvement
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="suggestions" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="suggestions">
                    Improvement Suggestions
                  </TabsTrigger>
                  <TabsTrigger value="missing">Missing Keywords</TabsTrigger>
                  <TabsTrigger value="matched">Matched Keywords</TabsTrigger>
                </TabsList>

                <TabsContent value="suggestions" className="mt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <Accordion type="single" collapsible className="w-full">
                        {analysisResults?.improvementSuggestions.map(
                          (category, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                              <AccordionTrigger className="text-left font-medium">
                                {category.category}
                              </AccordionTrigger>
                              <AccordionContent>
                                <ul className="list-disc pl-6 space-y-2">
                                  {category.suggestions.map((suggestion, i) => (
                                    <li key={i} className="text-gray-700">
                                      {suggestion}
                                    </li>
                                  ))}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                          ),
                        )}
                      </Accordion>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="missing" className="mt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-5 w-5 text-amber-500" />
                          <h4 className="font-medium">
                            Keywords not found in your resume
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {analysisResults?.missingKeywords.map(
                            (keyword, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="bg-amber-50 text-amber-800 border-amber-200"
                              >
                                {keyword}
                              </Badge>
                            ),
                          )}
                        </div>
                        <Alert className="bg-blue-50 border-blue-200">
                          <AlertDescription className="text-blue-800">
                            Consider adding these keywords to your resume to
                            improve your match score.
                          </AlertDescription>
                        </Alert>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="matched" className="mt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <h4 className="font-medium">
                            Keywords found in your resume
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {analysisResults?.matchedKeywords.map(
                            (keyword, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="bg-green-50 text-green-800 border-green-200"
                              >
                                {keyword}
                              </Badge>
                            ),
                          )}
                        </div>
                        <Alert className="bg-green-50 border-green-200">
                          <AlertDescription className="text-green-800">
                            Great job! These keywords from the job description
                            were found in your resume.
                          </AlertDescription>
                        </Alert>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col items-start border-t pt-6">
          <p className="text-sm text-gray-500">
            This tool is provided as a free, nonprofit service to help job
            seekers improve their application materials. Your resume data is not
            stored on our servers and is only used for analysis purposes.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResumeAnalyzer;
