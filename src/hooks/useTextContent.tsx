
import { useState, useEffect } from 'react';
import { TAB_CONTENT_FILES, TEXT_CONTENT_DIRECTORY } from '@/utils/constants';

const useTextContent = (tabId: string) => {
  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      setError(null);

      // Get the file name for this tab
      const fileName = TAB_CONTENT_FILES[tabId as keyof typeof TAB_CONTENT_FILES];
      
      if (!fileName) {
        setContent(null);
        setIsLoading(false);
        return;
      }

      try {
        const filePath = `${TEXT_CONTENT_DIRECTORY}/${fileName}`;
        console.log(`Attempting to load content from ${filePath}`);
        
        const response = await fetch(filePath);
        
        if (response.ok) {
          const text = await response.text();
          if (text.trim().length > 0) {
            setContent(text);
            console.log(`Loaded content from ${filePath}`);
          } else {
            console.log(`File is empty: ${filePath}`);
            setError(`${fileName} is empty`);
            setContent(null);
          }
        } else {
          console.log(`File not found: ${filePath}`);
          setError(`Failed to load ${fileName}`);
          setContent(null);
        }
      } catch (err) {
        console.error('Error loading text file:', err);
        setError('Failed to load content');
        setContent(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [tabId]);

  return { content, isLoading, error };
};

export default useTextContent;
