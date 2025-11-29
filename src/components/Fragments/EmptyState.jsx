import Text from "../Elements/Text/Text";

const EmptyState = () => {
  return (
    <div className="text-center mt-16">
      <Text classname="text-gray-600 text-xl font-thin ">Tidak ada tugas</Text>
      <Text classname="text-gray-500 text-sm font-thin mt-1">
        Klik tombol <span className="text-sm">"Tambah Tugas"</span> untuk
        membuat tugas baru
      </Text>
    </div>
  );
};

export default EmptyState;
