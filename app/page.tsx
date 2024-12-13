'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle2, Video, VideoOff } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
//import { Toast } from "@/components/ui/toast"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
//import { FFmpeg } from '@ffmpeg/ffmpeg';


export default function ApplicantForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [recordings, setRecordings] = useState<Blob[]>([])
  const [timer, setTimer] = useState(60)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

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

  const questions = [
    "Tell us about yourself and your background.",
    "What are your career goals and aspirations?",
    "Why do you think you'd be a good fit for this position?"
  ]

  const startRecording = async () => {
    try {
      setError(null)
      const constraints = { video: true, audio: true }; // Minimal constraints for compatibility (phone)

     /* const constraints = {
        video: {
          //facingMode: 'user',
         // width: { ideal: 1280 },
          //height: { ideal: 720 }
        },
        audio: true
      };*/
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
        setRecordings(prev => [...prev, blob])
     
      }
      mediaRecorder.start()
      setIsRecording(true)
      setTimer(60) // Reset timer to 60 seconds
      toast({
        title: "Recording started",
        description: "Your video is now being recorded.",
      })
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
      setCurrentQuestion(prev => prev + 1)
      toast({
        title: "Recording stopped",
        description: "Your video has been successfully recorded.",
      })
    }
  }

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !phone || recordings.length !== questions.length) {
      toast({
        title: "Incomplete application",
        description: "Please fill in all fields and complete all recordings before submitting.",
        variant: "destructive",
      })
      return
    }

    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('phone', phone)
    recordings.forEach((recording, index) => {
      formData.append(`video`, recording, `video${index + 1}.webm`)
    })

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
          setCurrentQuestion(0)
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
  }, [name, email, phone, recordings, questions.length, toast, setUploadProgress, setUploadStatus])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Video Interview</h1>
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Interview Questions</h2>
          <h3 className='text-lg font-normal'>Please answer the following questions in <strong>1 minute or less:</strong></h3>

          {questions.map((question, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <h3 className="font-medium mb-1">Question {index + 1}</h3>
                <p className="mb-2">{question}</p>
                {index === currentQuestion ? (
                  <div>
                    <video ref={videoRef} className="w-full mb-2 aspect-video" playsInline muted />
                    {!isRecording ? (
                      <Button className='max-md:w-full' type="button" onClick={startRecording}>Start Recording</Button>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Button className='max-md:w-full' type="button" onClick={stopRecording}>Stop Recording</Button>
                        <span className="text-sm font-medium">{timer} seconds remaining</span>
                      </div>
                    )}
                 
                  </div>
                ) : index < currentQuestion ? (
                  <div className="flex items-center text-green-600">
                    <Video className="mr-2" />
                    <span>Recorded</span>
                  </div>
                ) : (
                  <div className="flex items-center text-gray-400">
                    <VideoOff className="mr-2" />
                    <span>Not yet recorded</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        {currentQuestion >= questions.length && (
          <Button type="submit" disabled={isUploading || recordings.length !== questions.length}>
            {isUploading ? 'Uploading...' : 'Submit Application'}
          </Button>
        )}
        {isUploading && (
          <div className="space-y-2">
            <Progress value={uploadProgress} className="w-full" />
            <p className="text-sm text-muted-foreground">Uploading: {uploadProgress.toFixed(0)}%</p>
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
  )
}

