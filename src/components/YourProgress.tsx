
import { ExerciseResult } from '@/utils/noteUtils';
import { format } from 'date-fns';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface YourProgressProps {
  results: ExerciseResult[];
}

const YourProgress: React.FC<YourProgressProps> = ({ results }) => {
  return (
    <div className="container max-w-3xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold text-primary mb-6 text-center">Your Progress</h2>
      
      {results.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              No exercises completed yet. Start training to see your progress!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {results.map((result, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg flex justify-between">
                  <span>Training Session</span>
                  <span className="text-muted-foreground text-base">
                    {format(result.date, 'MMM d, yyyy - h:mm a')}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Exercises</p>
                    <p className="text-xl font-semibold">{result.totalExercises}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Attempts</p>
                    <p className="text-xl font-semibold">{result.totalAttempts}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                    <p className="text-xl font-semibold">{result.successPercentage}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default YourProgress;
