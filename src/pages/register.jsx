import RegisterForm from "../components/Fragments/RegisterForm";
import AuthLayouts from "../components/Layouts/AuthLayouts";

const Register = () => {
  return (
    <AuthLayouts
      type="register"
      title="TodoList App"
      desc="Yuk, Daftar! untuk mulai mengelola tugasmu"
    >
      <RegisterForm />
    </AuthLayouts>
  );
};

export default Register;
