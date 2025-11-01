// "use client"

// import React, { useState, useRef } from "react"
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { UploadIcon } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { toast } from "sonner"

// export default function ResumePageClient() {
//   const [isDragOver, setIsDragOver] = useState(false)
//   const [jobName, setJobName] = useState("")
//   const [jobDescription, setJobDescription] = useState("")
//   const [jobExperience, setJobExperience] = useState("")
//   const [fileName, setFileName] = useState("")
//   const fileRef = useRef(null)

//   const handleFileUpload = (file) => {
//     if (!file) return

//     if (file.size > 10 * 1024 * 1024) {
//       toast.error("File size exceeds 10MB limit")
//       return
//     }

//     const allowedTypes = [
//       "application/pdf",
//       "application/msword",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//       "text/plain",
//     ]

//     if (!allowedTypes.includes(file.type)) {
//       toast.error("Please upload a PDF, Word document, or text file")
//       return
//     }

//     fileRef.current = file
//     setFileName(file.name)
//     toast.success("Resume uploaded successfully ✅")
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()

//     if (!jobName || !jobDescription || !jobExperience || !fileRef.current) {
//       toast.error("Please fill in all fields and upload your resume")
//       return
//     }

//     // You can handle API submission logic here
//     toast.success("Form submitted successfully 🚀")
//   }

//   return (
//     <div className="w-full space-y-8">
//       <Card>
//         <CardHeader>
//           <CardTitle>Upload Resume for Job</CardTitle>
//           <CardDescription>
//             Enter job details and upload your resume for analysis or application
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Job Name */}
//             <div>
//               <label className="block mb-1 font-medium">Job Name</label>
//               <Input
//                 placeholder="e.g. Frontend Developer"
//                 value={jobName}
//                 onChange={(e) => setJobName(e.target.value)}
//               />
//             </div>

//             {/* Job Experience */}
//             <div>
//               <label className="block mb-1 font-medium">Job Experience Level</label>
//               <Select onValueChange={setJobExperience}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select experience level" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="internship">Internship</SelectItem>
//                   <SelectItem value="entry">Entry Level</SelectItem>
//                   <SelectItem value="mid">Mid Level</SelectItem>
//                   <SelectItem value="senior">Senior Level</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Job Description */}
//             <div>
//               <label className="block mb-1 font-medium">Job Description</label>
//               <Textarea
//                 placeholder="Describe the job role or paste the job description..."
//                 rows={5}
//                 value={jobDescription}
//                 onChange={(e) => setJobDescription(e.target.value)}
//               />
//             </div>

//             {/* File Upload */}
//             <div
//               className={cn(
//                 "mt-2 border-2 border-dashed rounded-lg p-6 transition-colors relative",
//                 isDragOver
//                   ? "border-primary bg-primary/5"
//                   : "border-muted-foreground/50 bg-muted/10"
//               )}
//               onDragOver={(e) => {
//                 e.preventDefault()
//                 setIsDragOver(true)
//               }}
//               onDragLeave={(e) => {
//                 e.preventDefault()
//                 setIsDragOver(false)
//               }}
//               onDrop={(e) => {
//                 e.preventDefault()
//                 setIsDragOver(false)
//                 handleFileUpload(e.dataTransfer.files[0])
//               }}
//             >
//               <label htmlFor="resume-upload" className="sr-only">
//                 Upload your resume
//               </label>
//               <input
//                 id="resume-upload"
//                 type="file"
//                 accept=".pdf,.doc,.docx,.txt"
//                 className="opacity-0 absolute inset-0 cursor-pointer"
//                 onChange={(e) => handleFileUpload(e.target.files?.[0])}
//               />

//               <div className="flex flex-col items-center justify-center text-center gap-3">
//                 <UploadIcon className="size-12 text-muted-foreground" />
//                 <div className="space-y-1">
//                   <p className="text-lg">
//                     Drag your resume here or click to upload
//                   </p>
//                   <p className="text-xs text-muted-foreground">
//                     Supported: PDF, DOC, DOCX, TXT (Max 10MB)
//                   </p>
//                   {fileName && (
//                     <p className="text-sm text-primary font-medium">
//                       Uploaded: {fileName}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="pt-2">
//               <Button type="submit" className="w-full">
//                 Submit
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

"use client"

import React, { useState, useRef } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UploadIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export default function ResumePageClient() {
  const [isDragOver, setIsDragOver] = useState(false)
  const [jobName, setJobName] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [jobExperience, setJobExperience] = useState("")
  const [fileName, setFileName] = useState("")
  const [submittedData, setSubmittedData] = useState(null)

  const fileRef = useRef(null)

  // Handle file upload
  const handleFileUpload = (file) => {
    if (!file) return

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size exceeds 10MB limit")
      return
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ]

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a PDF, Word document, or text file")
      return
    }

    fileRef.current = file
    setFileName(file.name)
    toast.success("Resume uploaded successfully ✅")
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!jobName || !jobDescription || !jobExperience || !fileRef.current) {
      toast.error("Please fill in all fields and upload your resume")
      return
    }

    // Convert file to object URL for preview
    const resumeUrl = URL.createObjectURL(fileRef.current)

    setSubmittedData({
      jobName,
      jobDescription,
      jobExperience,
      resumeUrl,
    })

    toast.success("Form submitted successfully 🚀")
  }

  // If form submitted, show feedback summary
  if (submittedData) {
    return (
      <div className="p-6 space-y-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold">Feedback Summary</h1>
        <p><strong>Job Name:</strong> {submittedData.jobName}</p>
        <p><strong>Experience Level:</strong> {submittedData.jobExperience}</p>
        <p><strong>Description:</strong></p>
        <p className="whitespace-pre-wrap">{submittedData.jobDescription}</p>

        {submittedData.resumeUrl && (
          <div className="mt-4">
            <p><strong>Uploaded Resume:</strong></p>
            <iframe
              src={submittedData.resumeUrl}
              className="w-full h-[600px] border mt-2"
              title="Resume Preview"
            />
          </div>
        )}

        <Button
          className="mt-4"
          onClick={() => {
            // Reset form to submit another
            setJobName("")
            setJobDescription("")
            setJobExperience("")
            setFileName("")
            fileRef.current = null
            setSubmittedData(null)
          }}
        >
          Submit Another
        </Button>
      </div>
    )
  }

  // Else, render the form
  return (
    <div className="w-full space-y-8 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Upload Resume for Job</CardTitle>
          <CardDescription>
            Enter job details and upload your resume for analysis or application
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Job Name */}
            <div>
              <label className="block mb-1 font-medium">Job Name</label>
              <Input
                placeholder="e.g. Frontend Developer"
                value={jobName}
                onChange={(e) => setJobName(e.target.value)}
              />
            </div>

            {/* Job Experience */}
            <div>
              <label className="block mb-1 font-medium">Job Experience Level</label>
              <Select onValueChange={setJobExperience}>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="internship">Internship</SelectItem>
                  <SelectItem value="entry">Entry Level</SelectItem>
                  <SelectItem value="mid">Mid Level</SelectItem>
                  <SelectItem value="senior">Senior Level</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Job Description */}
            <div>
              <label className="block mb-1 font-medium">Job Description</label>
              <Textarea
                placeholder="Describe the job role or paste the job description..."
                rows={5}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>

            {/* File Upload */}
            <div
              className={cn(
                "mt-2 border-2 border-dashed rounded-lg p-6 transition-colors relative",
                isDragOver
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/50 bg-muted/10"
              )}
              onDragOver={(e) => {
                e.preventDefault()
                setIsDragOver(true)
              }}
              onDragLeave={(e) => {
                e.preventDefault()
                setIsDragOver(false)
              }}
              onDrop={(e) => {
                e.preventDefault()
                setIsDragOver(false)
                handleFileUpload(e.dataTransfer.files[0])
              }}
            >
              <label htmlFor="resume-upload" className="sr-only">Upload your resume</label>
              <input
                id="resume-upload"
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                className="opacity-0 absolute inset-0 cursor-pointer"
                onChange={(e) => handleFileUpload(e.target.files?.[0])}
              />

              <div className="flex flex-col items-center justify-center text-center gap-3">
                <UploadIcon className="size-12 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-lg">Drag your resume here or click to upload</p>
                  <p className="text-xs text-muted-foreground">
                    Supported: PDF, DOC, DOCX, TXT (Max 10MB)
                  </p>
                  {fileName && (
                    <p className="text-sm text-primary font-medium">Uploaded: {fileName}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" className="w-full">Submit</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
