'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle2} from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"

export default function ApplicantForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [recordings, setRecordings] = useState<Blob[]>([])
  const [timer, setTimer] = useState(180)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const questions = [
    "Tell us about yourself and your background.",
    "What are your career goals and aspirations?",
    "Why do you think you'd be a good fit for this position?"
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRecording && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      stopRecording();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording, timer]);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      setError(null)
      const constraints = { video: true, audio: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play().catch(playError => {
          console.error('Error playing video:', playError)
          setError('Error playing video. Please check your browser settings.')
        })
      }
      
      const mediaRecorder = new MediaRecorder(stream, {videoBitsPerSecond: 100000, mimeType: 'video/mp4'});
      mediaRecorderRef.current = mediaRecorder
      const chunks: BlobPart[] = []
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data)
        }
      }
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/mp4' })
        setRecordings([blob])
      }
      mediaRecorder.start()
      setIsRecording(true)
      setTimer(180) // Reset timer to 180 seconds (3 minutes)
      toast({
        title: "Recording started",
        description: "Your video is now being recorded. Answer all three questions within 3 minutes.",
      })

      // Make video fullscreen on mobile
      if (videoRef.current && videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      }
    } catch (error) {
      console.error('Error accessing media devices:', error)
      let errorMessage = 'Could not access your camera and microphone. Please check your permissions.'
      if (error instanceof DOMException) {
        switch (error.name) {
          case 'NotAllowedError':
            errorMessage = 'Permission to access camera and microphone was denied. Please allow access in your browser settings.'
            break;
          case 'NotFoundError':
            errorMessage = 'No camera or microphone found. Please ensure your devices are properly connected.'
            break;
          case 'NotReadableError':
            errorMessage = 'Your camera or microphone is already in use by another application. Please close other apps and try again.'
            break;
          case 'OverconstrainedError':
            errorMessage = 'No suitable camera found. Try using a different device or adjusting your camera settings.'
            break;
          case 'AbortError':
            errorMessage = 'Something went wrong while setting up your camera and microphone. Please try again.'
            break;
        }
      }
      setError(errorMessage)
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      toast({
        title: "Recording stopped",
        description: "Your video has been successfully recorded.",
      })

      // Exit fullscreen
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(err => {
          console.error(`Error attempting to exit fullscreen: ${err.message}`);
        });
      }
    }
  }

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !phone || recordings.length !== 1) {
      toast({
        title: "Incomplete application",
        description: "Please fill in all fields and complete the video recording before submitting.",
        variant: "destructive",
      })
      return
    }

    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('phone', phone)
    formData.append('video', recordings[0], 'video.mp4')

    setIsUploading(true)
    setUploadStatus('uploading')
    setUploadProgress(0)

    try {
      const xhr = new XMLHttpRequest()
      xhr.open('POST', 'https://video-backend-1ci2.onrender.com/api/submit-application')

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100
          setUploadProgress(percentComplete)
        }
      }

      xhr.onload = () => {
        if (xhr.status === 200) {
          setUploadStatus('success')
          toast({
            title: "Application submitted",
            description: "Your application has been successfully submitted.",
          })
          // Reset form
          setName('')
          setEmail('')
          setPhone('')
          setRecordings([])
        } else {
          setUploadStatus('error')
          toast({
            title: "Submission failed",
            description: "Failed to submit application. Please try again.",
            variant: "destructive",
          })
        }
        setIsUploading(false)
      }

      xhr.onerror = () => {
        setUploadStatus('error')
        toast({
          title: "Error",
          description: "An error occurred while submitting your application. Please try again.",
          variant: "destructive",
        })
        setIsUploading(false)
      }

      xhr.send(formData)
    } catch (error) {
      console.error('Error submitting application', error)
      setUploadStatus('error')
      toast({
        title: "Error",
        description: "An error occurred while submitting your application. Please try again.",
        variant: "destructive",
      })
      setIsUploading(false)
    }
  }, [name, email, phone, recordings, toast])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-300 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Video Interview Application</h1>
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name" className="text-blue-600">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border-2 border-purple-200 focus:border-blue-500"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-blue-600">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-2 border-purple-200 focus:border-blue-500"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-blue-600">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="border-2 border-purple-200 focus:border-blue-500"
              />
            </div>
          </div>

          <Card className="border-2 border-purple-200">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600">Interview Questions</h2>
              <p className="mb-4 text-gray-600">Please answer all three questions in one video (3 minutes max):</p>
              <ol className="list-decimal list-inside space-y-2 mb-4">
                {questions.map((question, index) => (
                  <li key={index} className="text-gray-700">{question}</li>
                ))}
              </ol>
              <div className="mt-4">
                <video ref={videoRef} className="w-full mb-4 aspect-video rounded-lg" playsInline muted />
                {!isRecording ? (
                  <Button
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                    type="button"
                    onClick={startRecording}
                  >
                    Start Recording
                  </Button>
                ) : (
                  <div className="flex flex-col items-center space-y-2">
                    <Button
                      className="w-full bg-purple-500 hover:bg-purple-600 text-white"
                      type="button"
                      onClick={stopRecording}
                    >
                      Stop Recording
                    </Button>
                    <span className="text-sm font-semibold text-red-500">{timer} seconds remaining</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {recordings.length > 0 && (
            <Button
              className="w-full bg-green-500 hover:bg-green-600 text-white"
              type="submit"
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Submit Application'}
            </Button>
          )}
          {isUploading && (
            <div className="space-y-2">
              <Progress value={uploadProgress} className="w-full" />
              <p className="text-sm text-gray-600">Uploading: {uploadProgress.toFixed(0)}%</p>
            </div>
          )}
          {uploadStatus === 'success' && (
            <div className="flex items-center text-green-600">
              <CheckCircle2 className="mr-2" />
              <span>Application submitted successfully!</span>
            </div>
          )}
          {uploadStatus === 'error' && (
            <div className="flex items-center text-red-600">
              <AlertCircle className="mr-2" />
              <span>Error submitting application. Please try again.</span>
            </div>
          )}
        </form>
        <Toaster />
      </div>
    </div>
  )
}

