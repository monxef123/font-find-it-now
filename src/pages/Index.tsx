
import { useState } from "react";
import { Upload, Image, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ImageUploader from "@/components/ImageUploader";
import FontResults from "@/components/FontResults";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [fontResults, setFontResults] = useState<any[]>([]);
  const { toast } = useToast();

  const handleImageUpload = async (file: File) => {
    setSelectedImage(file);
    setIsAnalyzing(true);
    
    // Simulate font recognition process
    setTimeout(() => {
      const mockResults = [
        { name: "Helvetica Neue", confidence: 95, category: "Sans-serif", similar: ["Arial", "Swiss 721"] },
        { name: "Futura", confidence: 87, category: "Geometric Sans", similar: ["Century Gothic", "Avenir"] },
        { name: "Proxima Nova", confidence: 82, category: "Humanist Sans", similar: ["Source Sans Pro", "Open Sans"] },
      ];
      setFontResults(mockResults);
      setIsAnalyzing(false);
      toast({
        title: "Analysis Complete!",
        description: "Found 3 matching fonts in your image.",
      });
    }, 3000);
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setFontResults([]);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"7\" cy=\"7\" r=\"3\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white">FindMyFont</h1>
            </div>
          </div>
          
          <p className="text-center text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Upload any image and discover the fonts within seconds. Our AI-powered recognition 
            identifies typography with incredible accuracy.
          </p>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            {!selectedImage ? (
              <div className="space-y-8">
                <ImageUploader onImageUpload={handleImageUpload} />
                
                {/* Features */}
                <div className="grid md:grid-cols-3 gap-6 mt-16">
                  <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6 text-center hover:bg-white/15 transition-all duration-300">
                    <Upload className="w-12 h-12 text-purple-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Easy Upload</h3>
                    <p className="text-white/70">Drag & drop or click to upload any image format</p>
                  </Card>
                  
                  <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6 text-center hover:bg-white/15 transition-all duration-300">
                    <Search className="w-12 h-12 text-blue-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">AI Recognition</h3>
                    <p className="text-white/70">Advanced machine learning identifies fonts accurately</p>
                  </Card>
                  
                  <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6 text-center hover:bg-white/15 transition-all duration-300">
                    <Image className="w-12 h-12 text-green-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Instant Results</h3>
                    <p className="text-white/70">Get font matches and similar alternatives instantly</p>
                  </Card>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">Analysis Results</h2>
                  <Button 
                    onClick={resetAnalysis}
                    variant="outline" 
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    Analyze New Image
                  </Button>
                </div>
                
                <FontResults 
                  image={selectedImage}
                  results={fontResults}
                  isAnalyzing={isAnalyzing}
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
