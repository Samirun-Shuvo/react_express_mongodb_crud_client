import "./App.css";
import { lazy, Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Lazy loading components
const Home = lazy(() => import("./components/home/Home"));
const AddUser = lazy(() => import("./components/addUser/AddUser"));
const UpdateUser = lazy(() => import("./components/updateUser/UpdateUser"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/adduser",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <AddUser />
      </Suspense>
    ),
  },
  {
    path: "/updateuser/:id",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <UpdateUser />
      </Suspense>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
