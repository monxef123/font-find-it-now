
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface FontResult {
  name: string;
  confidence: number;
  category: string;
  similar: string[];
}

interface FontResultsProps {
  image: File;
  results: FontResult[];
  isAnalyzing: boolean;
}

const FontResults: React.FC<FontResultsProps> = ({ image, results, isAnalyzing }) => {
  const imageUrl = React.useMemo(() => {
    return URL.createObjectURL(image);
  }, [image]);

  React.useEffect(() => {
    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Uploaded Image */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Uploaded Image</h3>
        <div className="relative rounded-lg overflow-hidden bg-white/5">
          <img 
            src={imageUrl} 
            alt="Uploaded font sample" 
            className="w-full h-auto max-h-96 object-contain"
          />
          {isAnalyzing && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-white font-medium">Analyzing fonts...</p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Results */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-white">Font Matches</h3>
        
        {isAnalyzing ? (
          /* Loading Skeletons */
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
                <Skeleton className="h-6 w-32 mb-3 bg-white/20" />
                <Skeleton className="h-4 w-24 mb-2 bg-white/10" />
                <Skeleton className="h-4 w-full bg-white/10" />
              </Card>
            ))}
          </div>
        ) : (
          /* Font Results */
          <div className="space-y-4">
            {results.map((font, index) => (
              <Card 
                key={index}
                className="bg-white/10 backdrop-blur-lg border-white/20 p-6 hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'serif' }}>
                      {font.name}
                    </h4>
                    <Badge variant="secondary" className="bg-purple-500/20 text-purple-200 border-purple-400/30">
                      {font.category}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-400">{font.confidence}%</div>
                    <div className="text-sm text-white/60">confidence</div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-white/80 text-lg" style={{ fontFamily: 'serif' }}>
                    The quick brown fox jumps over the lazy dog
                  </p>
                </div>
                
                <div>
                  <p className="text-white/60 text-sm mb-2">Similar fonts:</p>
                  <div className="flex flex-wrap gap-2">
                    {font.similar.map((similarFont, i) => (
                      <Badge 
                        key={i} 
                        variant="outline" 
                        className="border-white/30 text-white/80 hover:bg-white/10"
                      >
                        {similarFont}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
        
        {!isAnalyzing && results.length === 0 && (
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-8 text-center">
            <p className="text-white/60">No fonts detected in the image. Try uploading an image with clear text.</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FontResults;
