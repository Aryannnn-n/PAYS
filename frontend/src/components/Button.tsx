type ButtonProps = {
  label: string;
  onClick: () => void;
};

const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-black text-white w-[80%] p-2 rounded mt-2"
    >
      {label}
    </button>
  );
};

export default Button;
