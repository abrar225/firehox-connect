'use client';

import { Mic, MicOff, Video, VideoOff, PhoneOff, Box, Monitor } from 'lucide-react';
import { useMeetingStore } from '@/stores/meeting-store';

interface ControlBarProps {
  onLeave: () => void;
}

export function ControlBar({ onLeave }: ControlBarProps) {
  const { isMicOn, isCameraOn, toggleMic, toggleCamera, mode, setMode } = useMeetingStore();

  const toggleMode = () => {
    setMode(mode === 'vector' ? 'pixel' : 'vector');
  };

  return (
    <div className="flex justify-center pb-6">
      <div className="control-bar flex items-center gap-3">
        {/* Mute Toggle */}
        <button
          id="btn-mute"
          onClick={toggleMic}
          className={`control-btn ${!isMicOn ? 'bg-fh-error hover:bg-red-600' : ''}`}
          aria-label={isMicOn ? 'Mute' : 'Unmute'}
          title={isMicOn ? 'Mute' : 'Unmute'}
        >
          {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
        </button>

        {/* Camera Toggle */}
        <button
          id="btn-camera"
          onClick={toggleCamera}
          className={`control-btn ${!isCameraOn ? 'bg-fh-error hover:bg-red-600' : ''}`}
          aria-label={isCameraOn ? 'Turn off camera' : 'Turn on camera'}
          title={isCameraOn ? 'Turn off camera' : 'Turn on camera'}
        >
          {isCameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
        </button>

        {/* Mode Toggle (Vector / Pixel) */}
        <button
          id="btn-toggle-mode"
          onClick={toggleMode}
          className={`control-btn ${mode === 'vector' ? 'bg-fh-accent text-white' : 'bg-fh-bg-secondary'}`}
          aria-label={mode === 'vector' ? 'Vector Mode Active (Click for Video)' : 'Pixel Mode Active (Click for Avatar)'}
          title={mode === 'vector' ? 'Vector Mode Active' : 'Pixel Mode Active'}
        >
          {mode === 'vector' ? <Box className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
        </button>


        {/* Leave */}
        <button
          id="btn-leave"
          onClick={onLeave}
          className="control-btn-danger"
          aria-label="Leave meeting"
          title="Leave meeting"
        >
          <PhoneOff className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

