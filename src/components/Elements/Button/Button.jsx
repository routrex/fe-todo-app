const Button = (props) => {
  const { children, onClick, type = "button", classname = "" } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-lg font-medium transition-all duration-200 ${classname} `}
    >
      {children}
    </button>
  );
};

export default Button;
