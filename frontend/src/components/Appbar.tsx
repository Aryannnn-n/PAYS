const Appbar = () => {
  return (
    <>
      {/* Navbar */}
      <div className="h-12 bg-gray-100 flex items-center justify-between pl-8 pr-8 border-b border-gray-300">
        <h1 className="text-xl font-bold">Pays App</h1>
        <div className="flex items-center gap-4">
          <div className="text-gray-600">
            <i>Hello</i> ,<b>User</b>
          </div>
          <div className="bg-green-400 rounded-[50%] p-2">H</div>
        </div>
      </div>
    </>
  );
};

export default Appbar;
