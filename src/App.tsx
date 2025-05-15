import {ToastContainer} from "react-toastify";
import AppRoutes from "./routes/AppRoutes.tsx";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
      <div>
          <ToastContainer
              position="top-right"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
          />
          <AppRoutes/>
      </div>
  );
};

export default App;
