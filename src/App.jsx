import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/pages/Login";
import Home from "./components/pages/Home/Home";
import Calendar from "./components/pages/Calendar";

import BottomNav from "./components/public/BottomNav";
import AppLayout from "./components/layout/AppLayout";

export default function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* صفحه ورود */}
        <Route
          path="/"
          element={
            <AppLayout>
              <Login />
            </AppLayout>
          }
        />

        {/* صفحه اصلی */}
        <Route
          path="/home"
          element={
            <AppLayout>
              <Home showModal={showModal} setShowModal={setShowModal} />

              {!showModal && <BottomNav />}
            </AppLayout>
          }
        />

        {/* صفحه تقویم */}
        <Route
          path="/calendar"
          element={
            <AppLayout>
              <Calendar />
              <BottomNav />
            </AppLayout>
          }
        />

        {/* مسیرهای نامعتبر */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

