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
import { ThemeToggle } from "@/components/ui/theme-toggle";
import UserMenu from "@/components/auth/UserMenu";

const Home = () => {
  const [activeTab, setActiveTab] = useState("job-posting");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3 px-4 sticky top-0 z-10">
        <div className="container mx-auto max-w-6xl flex justify-between items-center">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
            AI Job Assistant
          </h2>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <UserMenu />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white dark:from-slate-800 dark:to-slate-900 py-16 px-4 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
                AI-Powered Job Application Assistant
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                Simplify your job application process with our AI tools that
                analyze job postings and improve your resume to increase your
                chances of landing interviews.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm">
                  <Briefcase className="h-5 w-5 text-blue-500" />
                  <span className="text-slate-700 dark:text-slate-200">
                    Job Posting Analysis
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <span className="text-slate-700 dark:text-slate-200">
                    Resume Optimization
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm">
                  <Heart className="h-5 w-5 text-blue-500" />
                  <span className="text-slate-700 dark:text-slate-200">
                    100% Free Service
                  </span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80"
                alt="Job application process"
                className="rounded-lg shadow-md w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-white dark:bg-slate-800 rounded-t-lg border-b dark:border-slate-700">
              <CardTitle className="text-2xl text-center text-slate-800 dark:text-white">
                Start Your Analysis
              </CardTitle>
              <CardDescription className="text-center text-slate-600 dark:text-slate-300">
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
                    <BookOpen className="h-4 w-4" />
                    Analyze Job Posting
                  </TabsTrigger>
                  <TabsTrigger
                    value="resume"
                    className="flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    Analyze Resume
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="p-0">
              <TabsContent value="job-posting" className="m-0">
                <JobPostingAnalyzer />
              </TabsContent>
              <TabsContent value="resume" className="m-0">
                <ResumeAnalyzer />
              </TabsContent>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-blue-50 dark:bg-slate-800 py-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 dark:text-white mb-4">
            Our Nonprofit Mission
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-3xl mx-auto">
            We believe everyone deserves access to quality job application
            assistance. This tool is completely free and designed to democratize
            access to AI-powered job search tools that would otherwise be
            expensive or inaccessible.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-sm max-w-xs">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-medium text-slate-800 dark:text-white mb-2">
                Free Forever
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Our service will always remain free, with no hidden fees or
                premium tiers.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-sm max-w-xs">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-medium text-slate-800 dark:text-white mb-2">
                Equal Opportunity
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                We're committed to helping job seekers from all backgrounds
                improve their applications.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-sm max-w-xs">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-medium text-slate-800 dark:text-white mb-2">
                Privacy First
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Your data stays on your device. We don't store your resumes or
                job descriptions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 dark:bg-slate-900 text-white py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-semibold">
                AI Job Application Assistant
              </h2>
              <p className="text-slate-300 text-sm">
                A free, nonprofit service
              </p>
            </div>
            <div className="text-slate-300 text-sm">
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
