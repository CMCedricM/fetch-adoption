const MyHeader = () => {
  return (
    <div className="w-full flex flex-auto flex-row items-center justify-center px-10 py-2 border-b border-b-black">
      <div className="grow text-[48px] text-[#2f922e] font-Rubik font-semibold">
        <h1>Fetch</h1>
      </div>
      <div className="px-8 py-2 rounded-md bg-[#2f922e]/70 hover:bg-[#2f922e]/90">
        <h1 className="text-lg text-black font-Rubik font-semibold">Login</h1>
      </div>
    </div>
  );
};

export default MyHeader;
