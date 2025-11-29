const Profile = (props) => {
  const { name, onClick } = props;
  const initial = name ? name.charAt(0).toUpperCase() : "?";

  return (
    <div
      onClick={onClick}
      className="w-9 h-9 flex items-center justify-center bg-teal-500 text-white rounded-full cursor-pointer hover:bg-teal-600 transition"
    >
      {initial}
    </div>
  );
};

export default Profile;
