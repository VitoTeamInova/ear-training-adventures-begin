import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import useAppConfig from '@/hooks/useAppConfig';
import { AppConfig, HeaderConfig } from '@/types/config';

interface ConfigurationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({ isOpen, onClose }) => {
  const { config, saveConfig } = useAppConfig();
  const [editingConfig, setEditingConfig] = useState<AppConfig>(config);

  const handleHeaderChange = (index: number, field: keyof HeaderConfig, value: string) => {
    const newHeaders = [...editingConfig.headers];
    newHeaders[index] = { ...newHeaders[index], [field]: value };
    setEditingConfig({ ...editingConfig, headers: newHeaders });
  };

  const handleFooterChange = (field: string, value: string) => {
    setEditingConfig({
      ...editingConfig,
      footer: { ...editingConfig.footer, [field]: value },
    });
  };

  const handleSave = async () => {
    await saveConfig(editingConfig);
    onClose();
  };

  const handleCancel = () => {
    setEditingConfig(config);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Application Configuration</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="headers" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="headers">Header Content</TabsTrigger>
            <TabsTrigger value="footer">Footer Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="headers" className="space-y-4">
            <div className="grid gap-4">
              {editingConfig.headers.map((header, index) => (
                <Card key={header.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{header.label}</CardTitle>
                    <CardDescription>Configure content for this tab</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor={`label-${index}`}>Tab Label</Label>
                      <Input
                        id={`label-${index}`}
                        value={header.label}
                        onChange={(e) => handleHeaderChange(index, 'label', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`content-${index}`}>HTML Content</Label>
                      <Textarea
                        id={`content-${index}`}
                        value={header.content}
                        onChange={(e) => handleHeaderChange(index, 'content', e.target.value)}
                        rows={6}
                        placeholder="Enter HTML content for this tab..."
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="footer" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Footer Configuration</CardTitle>
                <CardDescription>Configure footer information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input
                    id="company-name"
                    value={editingConfig.footer.companyName}
                    onChange={(e) => handleFooterChange('companyName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={editingConfig.footer.website}
                    onChange={(e) => handleFooterChange('website', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editingConfig.footer.email}
                    onChange={(e) => handleFooterChange('email', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Configuration
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfigurationPanel;