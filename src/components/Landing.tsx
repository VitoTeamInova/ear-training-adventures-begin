
import { Button } from '@/components/ui/button';

interface LandingProps {
  onStartClick: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStartClick }) => {
  return (
    <div className="container max-w-3xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <p className="text-center text-lg font-comfortaa mb-8 leading-relaxed">
          Please read through the information in the tabs above to understand why Ear Training is important. 
          <br /><br />
          This is a beginners lesson that will get you started using only 3 key notes Do, Fa and Sol. 
          These represent the 'Tonic', 'Fourth' and 'Fifth' notes of the basic 'C' scale. Again see tabs on top for more details. 
          All notes in these lessons will be using the Latin 'Do', 'Re', 'Mi' nomenclature while we will be using the anglo-saxon lettering nomenclature for 'Chords'.
          <br /><br />
          This is the first of a series of training apps offered to you by TEAMINOVA. 
          We suggest you score 100% on these exercises before moving on to the next app of the series. 
          Enjoy .. and write us at info@teaminova.com if you have any questions or suggestions!!!
          <br /><br />
          Click below to start your Ear Training exercise!!!
        </p>
        
        <div className="flex justify-center">
          <Button 
            onClick={onStartClick}
            className="bg-primary hover:bg-secondary text-white px-8 py-6 text-xl rounded-lg font-bold animate-pulse-scale"
          >
            START
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
