import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Download, Copy, CheckCircle, AlertCircle } from "lucide-react";

interface KeywordMatch {
  keyword: string;
  found: boolean;
}

interface Suggestion {
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
}

interface AnalysisResultsProps {
  type: "job" | "resume";
  title?: string;
  compatibilityScore?: number;
  requirements?: string[];
  responsibilities?: string[];
  keySkills?: string[];
  keywordMatches?: KeywordMatch[];
  suggestions?: Suggestion[];
  missingKeywords?: string[];
  onSave?: () => void;
  onCopy?: () => void;
  onExport?: () => void;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  type = "job",
  title = "Software Engineer",
  compatibilityScore = 75,
  requirements = [
    "Bachelor's degree in Computer Science or related field",
    "3+ years of experience with React.js",
    "Experience with TypeScript and modern JavaScript",
    "Knowledge of responsive design and accessibility standards",
  ],
  responsibilities = [
    "Develop and maintain web applications using React.js",
    "Collaborate with cross-functional teams to define and implement new features",
    "Ensure the technical feasibility of UI/UX designs",
    "Optimize applications for maximum speed and scalability",
  ],
  keySkills = [
    "React.js",
    "TypeScript",
    "JavaScript",
    "HTML/CSS",
    "Git",
    "RESTful APIs",
  ],
  keywordMatches = [
    { keyword: "React.js", found: true },
    { keyword: "TypeScript", found: true },
    { keyword: "Node.js", found: false },
    { keyword: "AWS", found: false },
    { keyword: "Git", found: true },
    { keyword: "CI/CD", found: false },
  ],
  suggestions = [
    {
      title: "Add missing technical skills",
      description:
        "Consider adding experience with Node.js and AWS to your resume.",
      priority: "high",
    },
    {
      title: "Highlight CI/CD experience",
      description:
        "If you have any CI/CD experience, make sure to include it prominently.",
      priority: "medium",
    },
    {
      title: "Quantify your achievements",
      description:
        "Add metrics to demonstrate the impact of your work (e.g., improved performance by 30%).",
      priority: "medium",
    },
  ],
  missingKeywords = ["Node.js", "AWS", "CI/CD"],
  onSave = () => console.log("Saving analysis"),
  onCopy = () => console.log("Copying analysis"),
  onExport = () => console.log("Exporting analysis"),
}) => {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const getPriorityColor = (priority: "high" | "medium" | "low") => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  return (
    <motion.div
      className="w-full bg-white rounded-xl p-6"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <p className="text-gray-600 mt-1">
            {type === "job" ? "Job Posting Analysis" : "Resume Analysis"}
          </p>
        </div>

        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm" onClick={onCopy}>
            <Copy className="h-4 w-4 mr-2" /> Copy
          </Button>
          <Button variant="outline" size="sm" onClick={onSave}>
            <Download className="h-4 w-4 mr-2" /> Save
          </Button>
          <Button variant="default" size="sm" onClick={onExport}>
            Export
          </Button>
        </div>
      </div>

      {type === "resume" && (
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle>Compatibility Score</CardTitle>
            <CardDescription>
              How well your resume matches the job requirements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Progress value={compatibilityScore} className="h-3 w-full" />
              <span className="text-lg font-semibold">
                {compatibilityScore}%
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {keywordMatches?.map((match, index) => (
                <Badge
                  key={index}
                  variant={match.found ? "default" : "outline"}
                  className={
                    match.found
                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }
                >
                  {match.found ? (
                    <CheckCircle className="h-3 w-3 mr-1" />
                  ) : (
                    <AlertCircle className="h-3 w-3 mr-1" />
                  )}
                  {match.keyword}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Accordion type="single" collapsible className="w-full">
        {requirements && requirements.length > 0 && (
          <AccordionItem value="requirements">
            <AccordionTrigger className="text-lg font-medium">
              Requirements
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-6 space-y-2">
                {requirements.map((requirement, index) => (
                  <li key={index} className="text-gray-700">
                    {requirement}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        )}

        {responsibilities && responsibilities.length > 0 && (
          <AccordionItem value="responsibilities">
            <AccordionTrigger className="text-lg font-medium">
              Responsibilities
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-6 space-y-2">
                {responsibilities.map((responsibility, index) => (
                  <li key={index} className="text-gray-700">
                    {responsibility}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        )}

        {keySkills && keySkills.length > 0 && (
          <AccordionItem value="keySkills">
            <AccordionTrigger className="text-lg font-medium">
              Key Skills & Keywords
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-2">
                {keySkills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {type === "resume" && suggestions && suggestions.length > 0 && (
          <AccordionItem value="suggestions">
            <AccordionTrigger className="text-lg font-medium">
              Improvement Suggestions
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-md border ${getPriorityColor(suggestion.priority)}`}
                  >
                    <h4 className="font-medium flex items-center">
                      <Badge
                        variant="outline"
                        className={`mr-2 ${suggestion.priority === "high" ? "bg-red-100 text-red-800" : suggestion.priority === "medium" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}
                      >
                        {suggestion.priority}
                      </Badge>
                      {suggestion.title}
                    </h4>
                    <p className="mt-1 text-sm">{suggestion.description}</p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {type === "resume" && missingKeywords && missingKeywords.length > 0 && (
          <AccordionItem value="missingKeywords">
            <AccordionTrigger className="text-lg font-medium">
              Missing Keywords
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-2">
                {missingKeywords.map((keyword, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-gray-100 text-gray-800"
                  >
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {keyword}
                  </Badge>
                ))}
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Consider adding these keywords to your resume to improve your
                match score.
              </p>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </motion.div>
  );
};

export default AnalysisResults;
