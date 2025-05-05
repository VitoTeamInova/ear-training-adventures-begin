
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { NOTES, PlayableNote, getRandomPlayableNote } from '@/utils/noteUtils';
import useAudio from '@/hooks/useAudio';
import { Card } from '@/components/ui/card';
import { Music } from 'lucide-react';

interface EarTrainingExerciseProps {
  onComplete: (exercises: number, attempts: number) => void;
}

// Map notes to their interval names from C
const noteToInterval: Record<PlayableNote, string> = {
  'Do': 'Unison',
  'Fa': 'Perfect 4th',
  'Sol': 'Perfect 5th',
  'HighDo': 'Octave',
};

// Map notes to their position on the staff (0 = middle C line)
const noteToStaffPosition: Record<PlayableNote, number> = {
  'Do': 0, // Middle C (first ledger line below the staff)
  'Fa': 3, // F (first line from bottom of staff)
  'Sol': 4, // G (second line from bottom)
  'HighDo': 7, // High C (third space from bottom)
};

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
    
    // Check if the current note is HighDo and the user clicked the higher Do button (index 7)
    const isHighDoCorrect = currentNote === 'HighDo' && 
                          note === 'Do' && 
                          NOTES.findIndex(n => n.note === note && n.number === 8) === 7;
    
    if (note === currentNote || isHighDoCorrect) {
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

  // Render a music staff with notes
  const renderMusicStaff = () => {
    if (!currentNote || !isExerciseComplete) return null;
    
    const interval = noteToInterval[currentNote];
    
    return (
      <Card className="p-6 mt-6 mb-8">
        <div className="text-xl font-bold mb-4 text-center flex items-center justify-center gap-2">
          <Music className="text-primary" />
          <span>Interval: {interval}</span>
        </div>
        
        <div className="staff-container bg-white p-4 rounded-md">
          {/* Staff lines */}
          <div className="staff relative h-40">
            {/* Treble Clef - Using SVG instead of the unavailable TrebleClef icon */}
            <div className="absolute left-2 top-1 text-4xl">
              <svg className="h-32 w-10 text-gray-700" viewBox="0 0 20 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 5C12 8 6 14 6 22C6 30 12 32 12 32C12 32 10 28 10 22C10 16 14 12 14 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M14 12C14 12 16 14 16 18C16 22 14 24 11 24C8 24 6 22 6 19C6 16 8 14 11 14C14 14 16 16 16 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M11 24C11 24 8 28 8 34C8 40 10 46 15 50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <ellipse cx="6" cy="45" rx="2.5" ry="3" stroke="currentColor" strokeWidth="1.5" />
                <ellipse cx="10" cy="54" rx="2.5" ry="3" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            
            {/* Staff lines */}
            <div className="staff-lines">
              {[0, 1, 2, 3, 4].map(i => (
                <div key={i} className="h-[2px] bg-gray-700 w-full absolute" 
                     style={{ top: `${16 + i * 10}px` }} />
              ))}
            </div>
            
            {/* Ledger line for middle C */}
            <div className="h-[2px] bg-gray-700 w-16 absolute" 
                 style={{ top: `${16 + 5 * 10}px`, left: '60px' }} />
            
            {/* Note C (reference) */}
            <div className="absolute" style={{ top: `${16 + 5 * 10 - 8}px`, left: '60px' }}>
              <div className="w-10 h-10 rounded-full border-2 border-gray-700 bg-white flex items-center justify-center rotate-[-20deg]">
                <span className="text-xs font-bold">C</span>
              </div>
            </div>
            
            {/* Target Note */}
            <div className="absolute" 
                 style={{ 
                   top: `${16 + (5 - noteToStaffPosition[currentNote]) * 10 - 8}px`, 
                   left: '160px' 
                 }}>
              <div className="w-10 h-10 rounded-full border-2 border-primary bg-white flex items-center justify-center rotate-[-20deg] text-primary">
                <span className="text-xs font-bold">
                  {currentNote === 'HighDo' ? 'C' : 
                   currentNote === 'Fa' ? 'F' : 
                   currentNote === 'Sol' ? 'G' : 'C'}
                </span>
              </div>
            </div>
            
            {/* Ledger line for high C if needed */}
            {currentNote === 'HighDo' && (
              <div className="h-[2px] bg-gray-700 w-16 absolute" 
                   style={{ top: `${16 + (5 - noteToStaffPosition['HighDo']) * 10}px`, left: '157px' }} />
            )}
            
            {/* Interval text */}
            <div className="absolute bottom-0 w-full text-center text-sm text-gray-500">
              C {currentNote === 'Do' ? '' : 'to'} {currentNote === 'HighDo' ? 'C' : 
                currentNote === 'Fa' ? 'F' : 
                currentNote === 'Sol' ? 'G' : 'C'}
            </div>
          </div>
        </div>
      </Card>
    );
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
              Re-Play
            </Button>
          )}
          
          {/* Music staff visualization (shown only after successful recognition) */}
          {isExerciseComplete && renderMusicStaff()}
          
          {/* Note buttons */}
          <div className="flex justify-center space-x-3 mb-8">
            {NOTES.map((noteObj, index) => {
              const isHighDo = index === 7 && noteObj.note === 'Do';
              const isPlayable = noteObj.isPlayable || isHighDo;
              
              return (
                <button
                  key={`${noteObj.note}-${index}`}
                  className={`note-button ${isPlayable ? 'note-button-active' : 'note-button-inactive'}`}
                  onClick={() => isPlayable && handleNoteClick(noteObj.note)}
                  disabled={!isPlayable || isExerciseComplete}
                >
                  <div className="flex flex-col items-center">
                    <div className="text-sm font-bold mb-1">{noteObj.number}</div>
                    {noteObj.note}
                  </div>
                </button>
              );
            })}
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
