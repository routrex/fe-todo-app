import { CameraIcon } from "lucide-react";
import Input from "../Elements/Input/Input";
import Button from "../Elements/Button/Button";
import { useRef } from "react";

const ProfileUpload = (props) => {
  const { name, avatar, onChange  } = props;
  const fileInputRef = useRef(null);

  const handleOpenUpload = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="relative flex justify-center">
      <div className="w-32 h-32 bg-teal-500 rounded-full flex items-center justify-center text-white text-4xl relative">
        {avatar ? (
          <img
            src={avatar}
            alt="profile"
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-teal-500 flex items-center justify-center text-white text-3xl font-semibold">
            {name?.charAt(0).toUpperCase()}
          </div>
        )}

        <Button
          onClick={handleOpenUpload}
          classname="absolute rounded-3xl bottom-1 right-1 bg-teal-700 p-2 hover:bg-teal-800 "
        >
          <CameraIcon size={16} className="text-white" />
        </Button>

        <Input
          type="file"
          accept="image/*"
          classname="hidden"
          ref={fileInputRef}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
export default ProfileUpload;
