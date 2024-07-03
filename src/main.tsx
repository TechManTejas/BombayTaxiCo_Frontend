import { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { MyContextProvider } from "./context/context.provider.tsx";
import "./index.css";
import Loader from "./components/Loader/Loader.tsx";

const App = lazy(() => import("./App.tsx"));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MyContextProvider>
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
  </MyContextProvider>
);
