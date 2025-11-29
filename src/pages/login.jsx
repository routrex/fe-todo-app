import LoginForm from "../components/Fragments/LoginForm";
import AuthLayouts from "../components/Layouts/AuthLayouts";

const Login = () => {
  return (
    <AuthLayouts
      type="login"
      title="TodoList App"
      desc="Login dulu ya! sebelum mengelola tugasmu"
    >
      <LoginForm />
    </AuthLayouts>
  );  
};

export default Login;
