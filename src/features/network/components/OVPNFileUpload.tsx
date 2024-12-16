import React, { useRef } from 'react';
import { Upload, File } from 'lucide-react';
import { parseOVPNFile } from '../utils/ovpnParser';
import { VPNConfig } from '../types/network';

interface OVPNFileUploadProps {
  onConfigParsed: (config: Partial<VPNConfig>) => void;
}

export function OVPNFileUpload({ onConfigParsed }: OVPNFileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileRead = async (file: File) => {
    try {
      const content = await file.text();
      const parsedConfig = parseOVPNFile(content);
      
      onConfigParsed({
        name: file.name.replace('.ovpn', ''),
        host: parsedConfig.remote || '',
        port: parsedConfig.port || 1194,
        protocol: (parsedConfig.proto as 'udp' | 'tcp') || 'udp',
      });
    } catch (error) {
      console.error('Error parsing OVPN file:', error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith('.ovpn')) {
      handleFileRead(file);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-gray-300">
          OpenVPN Configuration File
        </label>
        <span className="text-xs text-gray-400">.ovpn</span>
      </div>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md hover:border-gray-500 transition-colors cursor-pointer"
           onClick={() => fileInputRef.current?.click()}>
        <div className="space-y-1 text-center">
          <File className="mx-auto h-12 w-12 text-gray-400" />
          <div className="flex text-sm text-gray-400">
            <label className="relative cursor-pointer rounded-md font-medium text-blue-500 hover:text-blue-400 focus-within:outline-none">
              <span>Upload a file</span>
              <input
                ref={fileInputRef}
                type="file"
                className="sr-only"
                accept=".ovpn"
                onChange={handleFileChange}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-400">
            OpenVPN configuration file
          </p>
        </div>
      </div>
    </div>
  );
}