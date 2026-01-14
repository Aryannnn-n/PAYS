const InputBox = ({
  placeholder,
  label,
  onchange,
}: {
  placeholder: string;
  label: string;
  onchange: any;
}) => {
  return (
    <div className="w-full mt-2">
      <div className="text-left ml-4 mb-1 font-medium text-sm">{label}</div>
      <input
        type="text"
        placeholder={placeholder}
        onChange={onchange}
        className="w-[90%] p-2 placeholder:text-sm placeholder:p-2 border bg-gray-50 border-gray-200  rounded"
      />
    </div>
  );
};

export default InputBox;
