import { useState, useEffect } from 'react';
import { AppConfig } from '@/types/config';

const DEFAULT_CONFIG: AppConfig = {
  headers: [
    { id: 'landing', label: 'Home', content: '<h1>Welcome to Ear Training</h1><p>Start your musical journey here.</p>' },
    { id: 'why-ear-training', label: '1. Why Ear Training', content: '<h1>Why Ear Training?</h1><p>Ear training is essential for musical development.</p>' },
    { id: 'understanding-notes', label: '2. Understanding Notes', content: '<h1>Understanding Notes</h1><p>Learn about musical notes and their relationships.</p>' },
    { id: 'intervals', label: '3. Intervals', content: '<h1>Intervals</h1><p>Master the art of recognizing intervals.</p>' },
    { id: 'chords', label: '4. Chords', content: '<h1>Chords</h1><p>Understand chord progressions and harmony.</p>' },
    { id: 'your-progress', label: 'YOUR PROGRESS', content: '<h1>Your Progress</h1><p>Track your learning journey.</p>' },
  ],
  footer: {
    companyName: 'A TeamInova Application',
    website: 'www.teaminova.com',
    email: 'info@teaminova.com',
  },
};

const useAppConfig = () => {
  const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const response = await fetch('/app-config.json');
        if (response.ok) {
          const data = await response.json();
          setConfig(data);
        } else {
          console.log('Config file not found, using default configuration');
        }
      } catch (error) {
        console.log('Error loading config, using default configuration:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadConfig();
  }, []);

  const saveConfig = async (newConfig: AppConfig) => {
    try {
      // In a real app, this would save to a backend
      // For now, we'll just update the local state
      setConfig(newConfig);
      localStorage.setItem('app-config', JSON.stringify(newConfig));
      console.log('Configuration saved to localStorage');
    } catch (error) {
      console.error('Error saving configuration:', error);
    }
  };

  return { config, setConfig, saveConfig, isLoading };
};

export default useAppConfig;