import React from "react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import Routes from "./Routes";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import RootReducer from "./redux/sagas/RootSaga";
import { store, sagaMiddleware, persistor } from "./redux";
import { PersistGate } from "redux-persist/integration/react";
import history from './utils/History';
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import ErrorNotification from "./components/ErrorNotification/ErrorNotification";
// import i18n from "./i18n";
// import { withNamespaces } from "react-i18next";

sagaMiddleware.run(RootReducer);
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router basename={process.env.REACT_APP_BASENAME || ""} history={history}>
          <PersistGate persistor={persistor}>
            <ErrorBoundary>
            <Navbar />
              <Routes /> 
            <Footer />
            <ErrorNotification />
            </ErrorBoundary>
          </PersistGate>
        </Router>
      </Provider>
    </div>
  );
}

// function App({ t }) {
//   const changeLanguage = (lng) => {
//     i18n.changeLanguage(lng);
//   };

//   return (
//     <div>
//       <button onClick={() => changeLanguage("de")}>de</button>
//       <button onClick={() => changeLanguage("en")}>en</button>
//       <h1>{t("home")}</h1>
//     </div>
//   );
// }

export default App;
// export default withNamespaces()(App);
