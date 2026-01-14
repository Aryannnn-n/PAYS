const BottomWarning = ({
  label,
  redirect_label,
}: {
  label: string;
  redirect_label: string;
}) => {
  return (
    <div className="mt-1">
      <p className="text-sm">
        <span className="text-gray-600">{label} </span>
        <span className="underline"> {redirect_label}</span>
      </p>
    </div>
  );
};

export default BottomWarning;
