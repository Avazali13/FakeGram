import { useState } from "react";
import toast from "react-hot-toast";

const usePreviewImg = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const maxFileSizeInBytes = 2 * 1024 * 1024;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > maxFileSizeInBytes) {
        toast.error("FIle size must be l;ess than 2Mb");
        setSelectedFile(null);
        return;
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please select an image file bratan");
      setSelectedFile(null);
    }
  };
  return { selectedFile, handleImageChange, setSelectedFile };
};
export default usePreviewImg;
