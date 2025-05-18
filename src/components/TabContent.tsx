
import useTextContent from '@/hooks/useTextContent';
import { FileText } from 'lucide-react';

const TabContent: React.FC<{ tabId: string }> = ({ tabId }) => {
  const { content, isLoading, error } = useTextContent(tabId);
  
  // If we have content from a text file, display it
  if (content) {
    return (
      <div className="container max-w-3xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose max-w-none">
            {/* Split content by line breaks and add paragraph tags */}
            {content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  // If loading, show loading state
  if (isLoading) {
    return (
      <div className="container max-w-3xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-sm p-8 flex justify-center">
          <p>Loading content...</p>
        </div>
      </div>
    );
  }
  
  // If there was an error loading the text file or no file exists, show default content
  const getTabContent = () => {
    switch (tabId) {
      case 'why-ear-training':
        return (
          <div className="prose max-w-none">
            <h1>Why Ear Training?</h1>
            <p>Ear training is the process of developing your ear to recognize musical elements such as intervals, chords, rhythms, and melodies.</p>
            <p>By training your ear, you'll be able to:</p>
            <ul>
              <li>Improve your musical memory</li>
              <li>Transcribe songs more easily</li>
              <li>Understand music theory concepts better</li>
              <li>Enhance your improvisation skills</li>
              <li>Play music by ear</li>
            </ul>
            <p>Ear training is essential for any musician regardless of the instrument you play or your musical style.</p>
          </div>
        );
      case 'understanding-notes':
        return (
          <div className="prose max-w-none">
            <h1>Understanding Notes</h1>
            <p>Notes are the building blocks of music. In Western music, there are 12 unique notes in an octave.</p>
            <p>In this application, we use the Latin notation system (Do, Re, Mi) instead of the Anglo-Saxon (C, D, E).</p>
            <ul>
              <li>Do = C</li>
              <li>Re = D</li>
              <li>Mi = E</li>
              <li>Fa = F</li>
              <li>Sol = G</li>
              <li>La = A</li>
              <li>Si/Ti = B</li>
            </ul>
            <p>The beginner exercises focus on three key notes: Do (the tonic), Fa (the fourth), and Sol (the fifth).</p>
          </div>
        );
      case 'intervals':
        return (
          <div className="prose max-w-none">
            <h1>Intervals</h1>
            <p>An interval is the distance between two notes. The smallest interval in Western music is a semitone or half step.</p>
            <p>Common intervals include:</p>
            <ul>
              <li>Unison (same note)</li>
              <li>Minor 2nd (1 semitone)</li>
              <li>Major 2nd (2 semitones)</li>
              <li>Minor 3rd (3 semitones)</li>
              <li>Major 3rd (4 semitones)</li>
              <li>Perfect 4th (5 semitones)</li>
              <li>Perfect 5th (7 semitones)</li>
              <li>Octave (12 semitones)</li>
            </ul>
            <p>Recognizing intervals is a fundamental skill in ear training.</p>
          </div>
        );
      case 'chords':
        return (
          <div className="prose max-w-none">
            <h1>Chords</h1>
            <p>A chord is a group of three or more notes played together. The most basic chord is a triad, which consists of three notes.</p>
            <p>Common chord types include:</p>
            <ul>
              <li>Major triad (1-3-5)</li>
              <li>Minor triad (1-♭3-5)</li>
              <li>Augmented triad (1-3-♯5)</li>
              <li>Diminished triad (1-♭3-♭5)</li>
              <li>Seventh chords (1-3-5-7)</li>
            </ul>
            <p>In these exercises, we start with a C major chord (Do-Mi-Sol) to establish the tonal center.</p>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="container max-w-3xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-sm p-8">
        {error && (
          <div className="mb-4 p-2 bg-amber-50 border border-amber-200 rounded text-sm text-amber-700 flex items-center gap-2">
            <FileText size={16} />
            <span>{error} - Using default content</span>
          </div>
        )}
        {getTabContent()}
      </div>
    </div>
  );
};

export default TabContent;
