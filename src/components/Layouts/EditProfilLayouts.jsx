import EditProfileForm from "../Fragments/EditProfileForm";
import MainLayouts from "./MainLayouts";
import Button from "../Elements/Button/Button";
import { ArrowLeft } from "lucide-react";
import { Toaster } from "react-hot-toast";

const EditProfilLayouts = () => {
  return (
    <MainLayouts>
      <Toaster position="top-center" />
      <div className="max-w-3xl mx-auto px-4 ">
        <div className="mb-4">
          <Button
            onClick={() => window.history.back()}
            classname=" flex items-center gap-2 px-4 py-2 rounded-lg text-gray-800 hover:bg-teal-400 hover:text-white "
          >
            <ArrowLeft size={16} /> Kembali
          </Button>
        </div>

        <div className="mt-2">
          <EditProfileForm />
        </div>
      </div>
    </MainLayouts>
  );
};

export default EditProfilLayouts;
