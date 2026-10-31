import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/pages/Login";
import Home from "./components/pages/Home/Home";
import BottomNav from "./components/public/BottomNav";
import AppLayout from "./components/layout/AppLayout";

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
            <AppLayout>
              <Login />
            </AppLayout>
          }
        />

        <Route
          path="/home"
          element={
            <AppLayout>
              <Home
                showModal={showModal}
                setShowModal={setShowModal}
              />

              {!showModal && <BottomNav />}
            </AppLayout>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;