
import { useCallback, useRef } from 'react';
import { PlayableNote } from '../utils/noteUtils';

const useAudio = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    return audioContextRef.current;
  };

  const playChord = useCallback(() => {
    console.log('Playing C chord');
    const audioContext = getAudioContext();
    
    // C major chord frequencies (C4, E4, G4)
    const frequencies = [261.63, 329.63, 392.00];
    
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

  const playNote = useCallback((note: PlayableNote) => {
    console.log(`Playing note: ${note}`);
    
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

  return { playChord, playNote };
};

export default useAudio;
