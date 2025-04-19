import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import JobPostingAnalyzer from "./JobPostingAnalyzer";
import ResumeAnalyzer from "./ResumeAnalyzer";
import { BookOpen, Briefcase, FileText, Heart } from "lucide-react";

const Home = () => {
  const [activeTab, setActiveTab] = useState("job-posting");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="px-4 py-16 bg-gradient-to-b from-blue-50 to-white md:py-24">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="md:w-1/2">
              <h1 className="mb-4 text-4xl font-bold md:text-5xl text-slate-800">
                AI-Powered Job Application Assistant
              </h1>
              <p className="mb-6 text-lg text-slate-600">
                Simplify your job application process with our AI tools that
                analyze job postings and improve your resume to increase your
                chances of landing interviews.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
                  <Briefcase className="w-5 h-5 text-blue-500" />
                  <span className="text-slate-700">Job Posting Analysis</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <span className="text-slate-700">Resume Optimization</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
                  <Heart className="w-5 h-5 text-blue-500" />
                  <span className="text-slate-700">100% Free Service</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80"
                alt="Job application process"
                className="w-full rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 py-12">
        <div className="container max-w-6xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-white border-b rounded-t-lg">
              <CardTitle className="text-2xl text-center text-slate-800">
                Start Your Analysis
              </CardTitle>
              <CardDescription className="text-center text-slate-600">
                Choose an option below to begin improving your job application
                materials
              </CardDescription>
              <Tabs
                defaultValue="job-posting"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full mt-4"
              >
                <TabsList className="grid w-full grid-cols-2 mb-0">
                  <TabsTrigger
                    value="job-posting"
                    className="flex items-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    Analyze Job Posting
                  </TabsTrigger>
                  <TabsTrigger
                    value="resume"
                    className="flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Analyze Resume
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs> 
                <TabsContent value="job-posting" className="m-0">
                  <JobPostingAnalyzer />
                </TabsContent>
                <TabsContent value="resume" className="m-0">
                  <ResumeAnalyzer />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="px-4 py-12 bg-blue-50">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="mb-4 text-2xl font-semibold md:text-3xl text-slate-800">
            Our Nonprofit Mission
          </h2>
          <p className="max-w-3xl mx-auto mb-6 text-slate-600">
            We believe everyone deserves access to quality job application
            assistance. This tool is completely free and designed to democratize
            access to AI-powered job search tools that would otherwise be
            expensive or inaccessible.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="max-w-xs p-6 bg-white rounded-lg shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 p-3 mx-auto mb-4 bg-blue-100 rounded-full">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="mb-2 font-medium text-slate-800">Free Forever</h3>
              <p className="text-sm text-slate-600">
                Our service will always remain free, with no hidden fees or
                premium tiers.
              </p>
            </div>
            <div className="max-w-xs p-6 bg-white rounded-lg shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 p-3 mx-auto mb-4 bg-blue-100 rounded-full">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="mb-2 font-medium text-slate-800">
                Equal Opportunity
              </h3>
              <p className="text-sm text-slate-600">
                We're committed to helping job seekers from all backgrounds
                improve their applications.
              </p>
            </div>
            <div className="max-w-xs p-6 bg-white rounded-lg shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 p-3 mx-auto mb-4 bg-blue-100 rounded-full">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="mb-2 font-medium text-slate-800">Privacy First</h3>
              <p className="text-sm text-slate-600">
                Your data stays on your device. We don't store your resumes or
                job descriptions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 text-white bg-slate-800">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-semibold">
                AI Job Application Assistant
              </h2>
              <p className="text-sm text-slate-300">
                A free, nonprofit service
              </p>
            </div>
            <div className="text-sm text-slate-300">
              © {new Date().getFullYear()} AI Job Application Assistant. All
              rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
