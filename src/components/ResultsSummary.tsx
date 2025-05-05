
import { Button } from '@/components/ui/button';
import { calculateSuccessPercentage } from '@/utils/noteUtils';

interface ResultsSummaryProps {
  exercises: number;
  attempts: number;
  onReturn: () => void;
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({ exercises, attempts, onReturn }) => {
  const successPercentage = calculateSuccessPercentage(exercises, attempts);

  return (
    <div className="container max-w-3xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <h2 className="text-2xl font-bold text-primary mb-6">Exercise Summary</h2>
        
        <div className="space-y-3 mb-8 text-lg">
          <p>Total exercises completed: <span className="font-bold">{exercises}</span></p>
          <p>Total attempts made: <span className="font-bold">{attempts}</span></p>
          <p>Success rate: <span className="font-bold">{successPercentage}%</span></p>
        </div>
        
        <p className="mb-6">
          {successPercentage === 100 
            ? "Perfect score! You're ready for the next level!"
            : `Keep practicing! Try to achieve 100% success rate before moving to the next level.`
          }
        </p>
        
        <Button 
          onClick={onReturn} 
          className="bg-primary hover:bg-primary/90"
        >
          Return Home
        </Button>
      </div>
    </div>
  );
};

export default ResultsSummary;
