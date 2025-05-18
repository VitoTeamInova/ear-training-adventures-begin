
import { useCallback, useRef, useState, useEffect } from 'react';
import { PlayableNote } from '../utils/noteUtils';

const useAudio = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const [useMP3Files, setUseMP3Files] = useState<boolean>(false);

  // Check if piano-sounds directory exists
  useEffect(() => {
    // We'll test for the existence of the C4 file to determine if we should use MP3s
    fetch('/piano-sounds/C4.mp3', { method: 'HEAD' })
      .then(response => {
        setUseMP3Files(response.ok);
        console.log('Piano sounds directory found, using MP3 files');
      })
      .catch(() => {
        console.log('Piano sounds directory not found, using oscillator');
        setUseMP3Files(false);
      });
  }, []);

  const getAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    return audioContextRef.current;
  };

  // Play audio using an MP3 file
  const playAudioFile = useCallback((filePath: string) => {
    const audio = new Audio(filePath);
    audio.play().catch(error => {
      console.error('Error playing audio file:', error);
      // Fallback to oscillator if there's an error with the audio file
      if (filePath.includes('C4-Chord')) {
        playChordWithOscillator();
      } else {
        // Extract note from filePath and play with oscillator
        const note = filePath.split('/').pop()?.split('.')[0];
        if (note) {
          const noteMap: Record<string, PlayableNote> = {
            'C4': 'Do',
            'F4': 'Fa',
            'G4': 'Sol',
            'C5': 'HighDo'
          };
          const playableNote = noteMap[note] as PlayableNote;
          if (playableNote) {
            playNoteWithOscillator(playableNote);
          }
        }
      }
    });
  }, []);

  const playChordWithOscillator = useCallback(() => {
    console.log('Playing C chord with oscillator');
    const audioContext = getAudioContext();
    
    // C major chord frequencies (C4, E4, G4, C5)
    const frequencies = [261.63, 329.63, 392.00, 523.25];
    
    frequencies.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.frequency.value = freq;
      oscillator.type = 'sine';
      
      gainNode.gain.value = 0.2; // Lower volume for the chord

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.start();
      // Stagger the notes slightly for a more natural sound
      const delay = index * 50;
      
      // Start fade out after a short delay
      gainNode.gain.exponentialRampToValueAtTime(
        0.001, audioContext.currentTime + 1.5 + (delay / 1000)
      );
      
      // Stop the oscillator after the gain ramp is complete
      setTimeout(() => {
        oscillator.stop();
      }, 1600 + delay);
    });
  }, []);

  const playNoteWithOscillator = useCallback((note: PlayableNote) => {
    console.log(`Playing note ${note} with oscillator`);
    
    // Map notes to frequencies
    const noteToFrequency: Record<PlayableNote, number> = {
      'Do': 261.63, // C4 (low Do)
      'Fa': 349.23, // F4
      'Sol': 392.00, // G4
      'HighDo': 523.25, // C5 (high Do)
    };
    
    const audioContext = getAudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.frequency.value = noteToFrequency[note];
    oscillator.type = 'sine';
    
    gainNode.gain.value = 0.3;
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    
    // Smooth decay
    gainNode.gain.exponentialRampToValueAtTime(
      0.001, audioContext.currentTime + 1.0
    );
    
    // Stop the oscillator after the gain ramp is complete
    setTimeout(() => {
      oscillator.stop();
    }, 1100);
  }, []);

  // Play chord with either MP3 or oscillator
  const playChord = useCallback(() => {
    console.log('Playing C chord');
    if (useMP3Files) {
      playAudioFile('/piano-sounds/C4-Chord.mp3');
    } else {
      playChordWithOscillator();
    }
  }, [useMP3Files, playAudioFile]);

  // Play note with either MP3 or oscillator
  const playNote = useCallback((note: PlayableNote) => {
    console.log(`Playing note: ${note}`);
    
    if (useMP3Files) {
      // Map notes to file names
      const noteToFileName: Record<PlayableNote, string> = {
        'Do': 'C4.mp3',
        'Fa': 'F4.mp3',
        'Sol': 'G4.mp3',
        'HighDo': 'C5.mp3',
      };
      
      playAudioFile(`/piano-sounds/${noteToFileName[note]}`);
    } else {
      playNoteWithOscillator(note);
    }
  }, [useMP3Files, playAudioFile]);

  return { playChord, playNote };
};

export default useAudio;
