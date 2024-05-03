import { useState } from "react";
import toast from "react-hot-toast";

const usePreviewImgBg = () => {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const maxFileSizeInBytes = 2 * 1024 * 1024;

  const handleImageChanges = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file && file.type.startsWith("image/")) {
      if (file.size > maxFileSizeInBytes) {
        toast.error("FIle size must be l;ess than 2Mb");
        setSelectedFiles(null);
        return;
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedFiles(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please select an image file bratan");
      setSelectedFiles(null);
    }
  };
  return { selectedFiles, handleImageChanges, setSelectedFiles };
};
export default usePreviewImgBg;
