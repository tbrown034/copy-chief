export default function Header() {
  return (
    <div className="flex justify-between p-2 border-b-2 border-opacity-20 border-b-black">
      <div className="flex items-center gap-2 text-2xl">
        <i className="fa-solid fa-bars"></i>
        <div className="font-bold ">
          <span>Copy</span>
          <span>Chief</span>
        </div>
      </div>
      <button className="p-2 text-xs bg-sky-900 hover:bg-sky-700 active:bg-sky-600 text-sky-100 rounded-xl">
        Light/Dark Mode
      </button>
    </div>
  );
}
