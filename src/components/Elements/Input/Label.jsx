const Label = (props) => {
  const { htmlFor, children, classname } = props;
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium text-gray-600 ${classname}`}
    >
      {children}
    </label>
  );
};

export default Label;
