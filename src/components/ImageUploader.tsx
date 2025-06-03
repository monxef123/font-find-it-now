
import React, { useCallback, useState } from 'react';
import { Upload, Image } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onImageUpload(file);
      }
    }
  }, [onImageUpload]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        onImageUpload(file);
      }
    }
  };

  return (
    <Card 
      className={`
        relative overflow-hidden bg-white/10 backdrop-blur-lg border-2 border-dashed 
        transition-all duration-300 hover:bg-white/15 cursor-pointer
        ${isDragActive 
          ? 'border-purple-400 bg-purple-500/20 scale-105' 
          : 'border-white/30 hover:border-purple-300'
        }
      `}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />
      
      <div className="p-16 text-center">
        <div className="mx-auto mb-6 w-24 h-24 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
          {isDragActive ? (
            <Upload className="w-12 h-12 text-white animate-bounce" />
          ) : (
            <Image className="w-12 h-12 text-white" />
          )}
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-4">
          {isDragActive ? 'Drop your image here' : 'Upload Your Image'}
        </h3>
        
        <p className="text-white/70 text-lg mb-6">
          Drag and drop an image, or click to browse
        </p>
        
        <div className="flex flex-wrap justify-center gap-2 text-sm text-white/50">
          <span className="px-3 py-1 bg-white/10 rounded-full">JPG</span>
          <span className="px-3 py-1 bg-white/10 rounded-full">PNG</span>
          <span className="px-3 py-1 bg-white/10 rounded-full">GIF</span>
          <span className="px-3 py-1 bg-white/10 rounded-full">WEBP</span>
        </div>
      </div>
    </Card>
  );
};

export default ImageUploader;
