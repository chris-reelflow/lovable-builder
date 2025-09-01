import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const testBuild = async () => {
    try {
      // This would normally run the build script
      console.log('Build process would run here...');
      alert('In production, this would trigger the GitHub Actions workflow to build pages!');
    } catch (error) {
      console.error('Build failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            🚀 ReelFlow Landing Pages
          </Badge>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            CSV-Driven Landing Page Generator
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Automatically generate beautiful, branded landing pages for each customer from CSV data. 
            Built for GitHub Pages with manual build workflow.
          </p>
        </div>

        {/* System Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📊 CSV Input
              </CardTitle>
              <CardDescription>
                Simple content management via spreadsheet
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Company-specific content</li>
                <li>• Hero headlines & CTAs</li>
                <li>• Benefit points & features</li>
                <li>• Custom screenshots</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🎨 Brand Template
              </CardTitle>
              <CardDescription>
                Consistent ReelFlow styling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Branded colors & fonts</li>
                <li>• Pill buttons & gradients</li>
                <li>• Blurred backgrounds</li>
                <li>• Responsive design</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🌐 Auto Deploy
              </CardTitle>
              <CardDescription>
                GitHub Pages with custom URLs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• share.reelflow.com/[company]</li>
                <li>• Manual build trigger</li>
                <li>• SEO optimized</li>
                <li>• Analytics ready</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Current Status */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>
              Current configuration and next steps
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-green-600">✅ Completed</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Generator script created</li>
                  <li>• HTML template built</li>
                  <li>• GitHub Actions workflow</li>
                  <li>• Sample CSV data</li>
                  <li>• Basic brand styles</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-orange-600">⏳ Next Steps</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Connect to GitHub repo</li>
                  <li>• Add ReelFlow brand assets</li>
                  <li>• Update CSS with brand colors</li>
                  <li>• Configure custom domain</li>
                  <li>• Test first manual build</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* File Structure Preview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Project Structure</CardTitle>
            <CardDescription>
              Generated file organization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="text-sm bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`project/
├── data/landingpages.csv          # Content source (edit this!)
├── templates/landing-page.html    # HTML template  
├── assets/
│   ├── css/main.css              # Brand styles
│   └── images/                   # Logos, assets
├── scripts/generate-pages.js     # Build script
├── output/                       # Generated pages
│   ├── acme-corp/index.html     # Auto-generated
│   └── other-company/index.html
└── .github/workflows/build-pages.yml`}
            </pre>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="flex flex-wrap justify-center gap-4">
            <Button onClick={testBuild} size="lg" className="bg-blue-600 hover:bg-blue-700">
              Test Build Process
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/data/landingpages.csv" target="_blank">
                View Sample CSV
              </a>
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Ready to deploy? Check the <code className="bg-gray-100 px-2 py-1 rounded">SETUP.md</code> file for GitHub configuration steps.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
