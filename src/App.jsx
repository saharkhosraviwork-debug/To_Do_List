import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/pages/Login";
import Home from "./components/pages/Home/Home";
import Calendar from "./components/pages/Calendar";
import BottomNav from "./components/public/BottomNav";
import AppLayout from "./components/layout/AppLayout";
import Settings from "./components/pages/Setting";

export default function App() {
  const [showModal, setShowModal] = useState(false);

  // مدیریت تم برنامه
  const [theme, setTheme] = useState("light");

  return (
    <BrowserRouter>
      <Routes>
        {/* صفحه ورود */}
        <Route
          path="/"
          element={
            <AppLayout theme={theme}>
              <Login />
            </AppLayout>
          }
        />

        {/* صفحه اصلی */}
        <Route
          path="/home"
          element={
            <AppLayout theme={theme}>
              <Home
                showModal={showModal}
                setShowModal={setShowModal}
                theme={theme}
              />

              {!showModal && <BottomNav />}
            </AppLayout>
          }
        />

        {/* صفحه تنظیمات */}
        <Route
          path="/settings"
          element={
            <AppLayout theme={theme}>
              <Settings theme={theme} setTheme={setTheme} />
            </AppLayout>
          }
        />

        {/* صفحه تقویم */}
        <Route
          path="/calendar"
          element={
            <AppLayout theme={theme}>
              <Calendar theme={theme} />
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
