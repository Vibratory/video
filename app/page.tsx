import React, { useState, useRef, useCallback } from 'react';
import { toast } from 'react-hot-toast';

interface RecordingsState {
  name: string;
  email: string;
  phone: string;
  recordings: Blob[];
}

const App: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [recordings, setRecordings] = useState<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0); // 0: not started, 1: all questions answered
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState(180); // Update the timer state to 180 seconds (3 minutes)
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream>();
  const mediaRecorderRef = useRef<MediaRecorder>();

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
        setCurrentQuestion(1) // Set to 1 to indicate all questions are answered
      }
      mediaRecorder.start()
      setIsRecording(true)
      setTimer(180) // Reset timer to 180 seconds (3 minutes)
      toast({
        title: "Recording started",
        description: "Your video is now being recorded. Answer all three questions within 3 minutes.",
      })

      // Make video fullscreen on mobile
      if (videoRef.current && videoRef.current.webkitEnterFullscreen) {
        videoRef.current.webkitEnterFullscreen();
      }
    } catch (error) {
      setError((error as Error).message);
      toast({
        title: "Error starting recording",
        description: (error as Error).message,
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
      setCurrentQuestion(1) // Set to 1 to indicate all questions are answered
      toast({
        title: "Recording stopped",
        description: "Your video has been successfully recorded.",
      })

      // Exit fullscreen on mobile
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
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

    // ... (rest of handleSubmit function)
  }, [name, email, phone, recordings, toast]);


  return (
    <div>
      <h1>Video Recording Application</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          Phone:
          <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
        </label>
        <video ref={videoRef} style={{ width: '100%', height: 'auto' }}></video>
        <div>
          {!isRecording && <button onClick={startRecording}>Start Recording</button>}
          {isRecording && <button onClick={stopRecording}>Stop Recording</button>}
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;

