export interface HeaderConfig {
  id: string;
  label: string;
  content: string; // HTML content
}

export interface AppConfig {
  headers: HeaderConfig[];
  footer: {
    companyName: string;
    website: string;
    email: string;
  };
}