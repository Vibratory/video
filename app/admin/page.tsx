'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Applicant {
  id: number
  name: string
  email: string
  phone: string
  created_at: string
  video_paths: string
  question_numbers: string
}

export default function AdminInterface() {
  const [applications, setApplications] = useState<Applicant[]>([])
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://video-backend-i14c.onrender.com/api/admin/applications')
      if (response.ok) {
        const data = await response.json()
        setApplications(data)
      } else {
        console.error('Failed to fetch applications')
        setError('Failed to fetch applications.')
      }
    } catch (error) {
      console.error('Error fetching applications:', error)
      setError('An error occurred while fetching applications.')
    } finally {
      setLoading(false)
    }
  }

  const handleVideoClick = (videoPath: string, questionNumber: number) => {
    console.log('Video Path:', videoPath); // Log the full video path

    setSelectedVideo(`https://video-backend-1ci2.onrender.com/api/admin/video/${videoPath.split('\\').pop()}`)
    setSelectedQuestion(questionNumber)

  }

  const questions = [
    "Tell us about yourself and your background.",
    "What are your career goals and aspirations?",
    "Why do you think you'd be a good fit for this position?"
  ]

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Applications</h1>
      {loading ? (
        <p>Loading applications...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Videos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((applicant) => (
                  <TableRow key={applicant.id}>
                    <TableCell>{applicant.name}</TableCell>
                    <TableCell>{applicant.email}</TableCell>
                    <TableCell>{applicant.phone}</TableCell>
                    <TableCell>{new Date(applicant.created_at).toLocaleString()}</TableCell>
                    <TableCell>
                      {applicant.video_paths.split(',').map((path, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="mr-2 mb-2"
                          onClick={() => handleVideoClick(path, parseInt(applicant.question_numbers.split(',')[index]))}
                        >
                          Question {applicant.question_numbers.split(',')[index]}
                        </Button>
                      ))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div>
            {selectedVideo && (
              <div className="space-y-4">
                <video
                  src={selectedVideo}
                  controls
                  className="w-full max-w-md mx-auto"
                  onError={() => setError('Error loading video.')}
                >
                 <h1> Your browser does not support the video tag. </h1>
                </video>
                {selectedQuestion !== null && (
                  <div className="bg-gray-100 p-4 rounded-md">
                    <h3 className="font-semibold mb-2">Question {selectedQuestion}:</h3>
                    <p>{questions[selectedQuestion - 1]}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
