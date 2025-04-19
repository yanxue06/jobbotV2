import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  CheckCircle,
  AlertCircle,
  Link as LinkIcon,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface JobPostingAnalyzerProps {
  onAnalysisComplete?: (analysisData: JobAnalysisData) => void;
}

interface JobAnalysisData {
  title: string;
  company: string;
  requirements: string[];
  responsibilities: string[];
  keywords: string[];
  location: string;
  salary: string;
}

const JobPostingAnalyzer = ({
  onAnalysisComplete = () => {},
}: JobPostingAnalyzerProps) => {
  const [inputMethod, setInputMethod] = useState<"text" | "url">("text");
  const [jobDescription, setJobDescription] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisData, setAnalysisData] = useState<JobAnalysisData>({
    title: "Software Engineer",
    company: "Tech Innovations Inc.",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "3+ years of experience with React and TypeScript",
      "Experience with modern frontend frameworks",
      "Strong problem-solving skills",
      "Excellent communication abilities",
    ],
    responsibilities: [
      "Develop and maintain web applications using React",
      "Collaborate with cross-functional teams",
      "Write clean, maintainable code",
      "Participate in code reviews",
      "Troubleshoot and debug applications",
    ],
    keywords: [
      "React",
      "TypeScript",
      "Frontend",
      "JavaScript",
      "Web Development",
      "UI/UX",
      "Git",
      "Agile",
      "REST API",
      "Testing",
    ],
    location: "San Francisco, CA (Remote Available)",
    salary: "$120,000 - $150,000 per year",
  });

  const handleSubmit = async () => {
    if (inputMethod === "text" && !jobDescription.trim()) {
      setError("Please enter a job description");
      return;
    } else if (inputMethod === "url" && !jobUrl.trim()) {
      setError("Please enter a job posting URL");
      return;
    }

    setError(null);
    setIsAnalyzing(true);

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (inputMethod === "text") {
        // In a real implementation, this would be an API call to analyze the job description
        // For now, we'll just use the mock data
      } else if (inputMethod === "url") {
        // In a real implementation, this would call a backend API to scrape and analyze the URL
        // For now, we'll just use the mock data and show a message about future implementation
        console.log("URL to be scraped:", jobUrl);
      }

      setAnalysisComplete(true);
      onAnalysisComplete(analysisData);
    } catch (err) {
      setError(
        "An error occurred while analyzing the job posting. Please try again.",
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClear = () => {
    setJobDescription("");
    setJobUrl("");
    setAnalysisComplete(false);
    setError(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-background">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            Job Posting Analyzer
          </CardTitle>
          <CardDescription>
            Paste a job description below to extract key information and
            requirements.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!analysisComplete ? (
            <div className="space-y-4">
              <Tabs
                defaultValue="text"
                className="w-full"
                onValueChange={(value) =>
                  setInputMethod(value as "text" | "url")
                }
                value={inputMethod}
              >
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="text">Paste Job Description</TabsTrigger>
                  <TabsTrigger value="url">Job Posting URL</TabsTrigger>
                </TabsList>

                <TabsContent value="text" className="space-y-4">
                  <Textarea
                    placeholder="Paste the full job description here..."
                    className="min-h-[200px] p-4"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    disabled={isAnalyzing}
                  />
                </TabsContent>

                <TabsContent value="url" className="space-y-4">
                  <div className="flex flex-col space-y-2">
                    <p className="text-sm text-muted-foreground mb-2">
                      Enter the URL of the job posting. Our system will scrape
                      and analyze the content.
                    </p>
                    <div className="flex items-center space-x-2">
                      <LinkIcon className="h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="https://example.com/job-posting"
                        value={jobUrl}
                        onChange={(e) => setJobUrl(e.target.value)}
                        disabled={isAnalyzing}
                        className="flex-1"
                      />
                    </div>
                    {inputMethod === "url" && (
                      <Alert className="mt-4 bg-blue-50 border-blue-200">
                        <AlertCircle className="h-4 w-4 text-blue-500" />
                        <AlertTitle>Web Scraping Feature</AlertTitle>
                        <AlertDescription>
                          The web scraping functionality will be implemented
                          soon. For now, you can test the interface.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </TabsContent>
              </Tabs>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col space-y-2">
                <h3 className="text-xl font-semibold">{analysisData.title}</h3>
                <p className="text-muted-foreground">{analysisData.company}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="bg-blue-50">
                    {analysisData.location}
                  </Badge>
                  <Badge variant="outline" className="bg-green-50">
                    {analysisData.salary}
                  </Badge>
                </div>
              </div>

              <Tabs defaultValue="requirements" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="requirements">Requirements</TabsTrigger>
                  <TabsTrigger value="responsibilities">
                    Responsibilities
                  </TabsTrigger>
                  <TabsTrigger value="keywords">Key Skills</TabsTrigger>
                </TabsList>

                <TabsContent value="requirements" className="mt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="requirements">
                          <AccordionTrigger>Job Requirements</AccordionTrigger>
                          <AccordionContent>
                            <ul className="list-disc pl-5 space-y-2">
                              {analysisData.requirements.map((req, index) => (
                                <li key={index}>{req}</li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="responsibilities" className="mt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="responsibilities">
                          <AccordionTrigger>
                            Job Responsibilities
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="list-disc pl-5 space-y-2">
                              {analysisData.responsibilities.map(
                                (resp, index) => (
                                  <li key={index}>{resp}</li>
                                ),
                              )}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="keywords" className="mt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-medium mb-4">
                        Key Skills & Keywords
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {analysisData.keywords.map((keyword, index) => (
                          <Badge key={index} variant="secondary">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <Alert className="bg-blue-50 border-blue-200">
                <CheckCircle className="h-4 w-4 text-blue-500" />
                <AlertTitle>Analysis Complete</AlertTitle>
                <AlertDescription>
                  We've extracted the key information from this job posting. You
                  can now use this to tailor your resume.
                </AlertDescription>
              </Alert>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {!analysisComplete ? (
            <>
              <Button
                variant="outline"
                onClick={handleClear}
                disabled={isAnalyzing || !jobDescription}
              >
                Clear
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={
                  isAnalyzing ||
                  (inputMethod === "text" ? !jobDescription : !jobUrl)
                }
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Job Posting"
                )}
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={handleClear}>
                Analyze Another Job
              </Button>
              <Button>Save Analysis</Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default JobPostingAnalyzer;
