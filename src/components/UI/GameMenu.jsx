import HeadlineOptions from "../gameElements/HeadlineOptions";
import Header from "./Header";

export default function GameMenu({ backToMenu }) {
  return (
    <div className="h-screen ">
      <Header />
      <div className="flex flex-col items-center justify-center">
        <button
          onClick={backToMenu}
          className="p-2 px-12 text-lg bg-sky-900 hover:bg-sky-700 active:bg-sky-600 text-sky-100 rounded-xl"
        >
          Back
        </button>{" "}
        <HeadlineOptions />
      </div>
    </div>
  );
}
