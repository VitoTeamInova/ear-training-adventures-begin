import useAppConfig from '@/hooks/useAppConfig';

interface FooterProps {
  onConfigClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onConfigClick }) => {
  const { config } = useAppConfig();

  return (
    <footer className="w-full bg-secondary py-6 mt-8">
      <div className="container mx-auto px-4 text-center">
        <div className="space-y-2">
          <button
            onClick={onConfigClick}
            className="text-primary hover:text-primary/80 underline font-medium"
          >
            {config.footer.companyName}
          </button>
          <div className="flex justify-center items-center space-x-6 text-sm text-muted-foreground">
            <a
              href={`https://${config.footer.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              {config.footer.website}
            </a>
            <a
              href={`mailto:${config.footer.email}`}
              className="hover:text-primary transition-colors"
            >
              {config.footer.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;