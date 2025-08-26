
import { cn } from '@/lib/utils';
import useAppConfig from '@/hooks/useAppConfig';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const { config } = useAppConfig();

  return (
    <header className="w-full bg-card shadow-sm">
      <div className="container overflow-x-auto">
        <nav className="flex whitespace-nowrap">
          {config.headers.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-3 transition-all",
                activeTab === tab.id ? "tab-active" : "text-muted-foreground hover:text-primary"
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
