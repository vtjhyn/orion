'use client'

import { CloudUploadOutlined } from "@ant-design/icons";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value
}) => {
  const handleUpload = useCallback((result: any) => {
    onChange(result.info.secure_url);
  }, [onChange]);
  return ( 
    <CldUploadWidget 
      onUpload={handleUpload}
      uploadPreset="g9wpidom"
      options={{
        maxFiles: 1
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="relative mt-2 mx-auto h-[120px] w-[120px] cursor-pointer hover:opacity-70 transition flex flex-col justify-center items-center rounded-full border border-1 border-black"
          >
            <CloudUploadOutlined className="text-[30px]" />
            {value && (
              <div className="w-full">
                <Image 
                  alt="Upload"
                  fill
                  priority
                  style={{ objectFit: 'cover', borderRadius: '999999px'}}
                  src={value}
                />
              </div>
            )}
          </div>
        )
      }}
    </CldUploadWidget>
   );
}
 
export default ImageUpload;