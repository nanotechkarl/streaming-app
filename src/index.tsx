import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import store from "./store";
import { PersistGate } from "redux-persist/es/integration/react";
import { persistStore } from "redux-persist";

const container = document.getElementById("root")!;
const root = ReactDOM.createRoot(container);
let persistor = persistStore(store);

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
