import { useCallback, useRef, useState, useEffect } from 'react';
import { PlayableNote } from '../utils/noteUtils';
import { PIANO_SOUNDS_DIRECTORY } from '../utils/constants';

const useAudio = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const [useMP3Files, setUseMP3Files] = useState<boolean>(false);
  const [soundsDirectoryPath, setSoundsDirectoryPath] = useState<string | null>(null);

  // Check if piano sounds directory exists
  useEffect(() => {
    const testPath = `${PIANO_SOUNDS_DIRECTORY}/C4.mp3`;
    
    console.log(`Checking for piano sounds at: ${testPath}`);
    fetch(testPath, { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          console.log(`Found piano sounds at ${PIANO_SOUNDS_DIRECTORY}`);
          setUseMP3Files(true);
          setSoundsDirectoryPath(PIANO_SOUNDS_DIRECTORY);
        } else {
          throw new Error('Piano sounds directory not found');
        }
      })
      .catch(error => {
        console.log('Piano sounds directory not found, using oscillator');
        console.log('Error details:', error);
        setUseMP3Files(false);
        setSoundsDirectoryPath(null);
      });
  }, []);

  const getAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    return audioContextRef.current;
  };

  // Play audio using an MP3 file
  const playAudioFile = useCallback((fileName: string) => {
    if (!soundsDirectoryPath) {
      console.error('Sound directory path not set');
      return;
    }
    
    const filePath = `${soundsDirectoryPath}/${fileName}`;
    console.log(`Attempting to play audio file: ${filePath}`);
    
    const audio = new Audio(filePath);
    audio.play().catch(error => {
      console.error(`Error playing audio file ${filePath}:`, error);
      // Fallback to oscillator if there's an error with the audio file
      if (fileName.includes('C4-Chord')) {
        playChordWithOscillator();
      } else {
        // Extract note from filePath and play with oscillator
        const note = fileName.split('/').pop()?.split('.')[0];
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
  }, [soundsDirectoryPath]);

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
    console.log('Playing C chord, useMP3Files:', useMP3Files, 'soundsDirectoryPath:', soundsDirectoryPath);
    if (useMP3Files && soundsDirectoryPath) {
      playAudioFile('C4-Chord.mp3');
    } else {
      playChordWithOscillator();
    }
  }, [useMP3Files, playAudioFile, soundsDirectoryPath]);

  // Play note with either MP3 or oscillator
  const playNote = useCallback((note: PlayableNote) => {
    console.log(`Playing note: ${note}, useMP3Files:`, useMP3Files, 'soundsDirectoryPath:', soundsDirectoryPath);
    
    if (useMP3Files && soundsDirectoryPath) {
      // Map notes to file names
      const noteToFileName: Record<PlayableNote, string> = {
        'Do': 'C4.mp3',
        'Fa': 'F4.mp3',
        'Sol': 'G4.mp3',
        'HighDo': 'C5.mp3',
      };
      
      playAudioFile(noteToFileName[note]);
    } else {
      playNoteWithOscillator(note);
    }
  }, [useMP3Files, playAudioFile, soundsDirectoryPath]);

  return { playChord, playNote };
};

export default useAudio;
