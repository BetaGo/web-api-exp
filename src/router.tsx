import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import CompassDemo from "./demos/compass";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/demo/compass",
    element: <CompassDemo />,
  },
]);
