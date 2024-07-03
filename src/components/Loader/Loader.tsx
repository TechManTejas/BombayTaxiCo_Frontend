import "./Loader.css";

const Loader = () => (
  <div className="fixed z-50 w-full h-full flex justify-center items-center bg-zinc-950">
    <div className="loader">
      <div className="loader-item"></div>
      <div className="loader-item"></div>
    </div>
  </div>
);

export default Loader;
