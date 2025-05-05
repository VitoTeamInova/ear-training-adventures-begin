
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { NOTES, PlayableNote, getRandomPlayableNote } from '@/utils/noteUtils';
import useAudio from '@/hooks/useAudio';

interface EarTrainingExerciseProps {
  onComplete: (exercises: number, attempts: number) => void;
}

const EarTrainingExercise: React.FC<EarTrainingExerciseProps> = ({ onComplete }) => {
  const [currentNote, setCurrentNote] = useState<PlayableNote | null>(null);
  const [exercises, setExercises] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [isExerciseComplete, setIsExerciseComplete] = useState(false);
  const { playChord, playNote } = useAudio();
  
  // Start a new exercise
  const startExercise = () => {
    const note = getRandomPlayableNote();
    setCurrentNote(note);
    setIsExerciseComplete(false);
    
    // Play C chord followed by the target note
    playChord();
    
    // Play the random note after a short delay
    setTimeout(() => {
      if (note) playNote(note);
    }, 1500);
  };
  
  // Initialize first exercise
  useEffect(() => {
    startExercise();
  }, []);
  
  // Handle note button click
  const handleNoteClick = (note: string) => {
    if (!currentNote || isExerciseComplete) return;
    
    setAttempts(prev => prev + 1);
    
    if (note === currentNote) {
      // Correct answer
      setIsExerciseComplete(true);
      setExercises(prev => prev + 1);
    } else {
      // Incorrect answer, replay the note
      setTimeout(() => {
        if (currentNote) playNote(currentNote);
      }, 500);
    }
  };
  
  // Handle continue button click
  const handleContinue = () => {
    startExercise();
  };
  
  // Handle quit button click
  const handleQuit = () => {
    onComplete(exercises, attempts);
  };

  return (
    <div className="container max-w-3xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Ear Training Exercise</h2>
          <p className="mb-6">Listen to the chord followed by a single note, then click on the note you hear.</p>
          
          {!isExerciseComplete && (
            <Button 
              onClick={() => currentNote && playNote(currentNote)} 
              className="bg-secondary hover:bg-secondary/90 mb-6"
            >
              Play Note Again
            </Button>
          )}
          
          {/* Note buttons */}
          <div className="flex justify-center space-x-3 mb-8">
            {NOTES.map((noteObj, index) => (
              <button
                key={`${noteObj.note}-${index}`}
                className={`note-button ${noteObj.isPlayable ? 'note-button-active' : 'note-button-inactive'}`}
                onClick={() => noteObj.isPlayable && handleNoteClick(noteObj.note)}
                disabled={!noteObj.isPlayable || isExerciseComplete}
              >
                {noteObj.note}
              </button>
            ))}
          </div>
          
          {/* Status */}
          <div className="text-lg mb-6">
            <p>Exercises completed: {exercises}</p>
            <p>Total attempts: {attempts}</p>
          </div>
          
          {/* Exercise complete actions */}
          {isExerciseComplete && (
            <div className="flex justify-center space-x-4">
              <Button 
                onClick={handleContinue} 
                className="bg-primary hover:bg-primary/90"
              >
                Continue
              </Button>
              <Button 
                onClick={handleQuit} 
                className="bg-secondary hover:bg-secondary/90"
              >
                Quit
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EarTrainingExercise;
