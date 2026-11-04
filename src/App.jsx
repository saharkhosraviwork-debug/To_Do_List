import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/pages/Login";
import Home from "./components/pages/Home/Home";
import Calendar from "./components/pages/Calendar";
import BottomNav from "./components/public/BottomNav";
import AppLayout from "./components/layout/AppLayout";
import Settings from "./components/pages/Setting";
import Share from "./components/pages/Share";
import Status from "./components/pages/Status";

export default function App() {
  // وضعیت مشترک مودال Home و Share
  const [showModal, setShowModal] = useState(false);

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

        {/* صفحه ارسال */}
        <Route
          path="/share"
          element={
            <AppLayout theme={theme}>
              <Share showModal={showModal} setShowModal={setShowModal} />

              {!showModal && <BottomNav theme={theme} />}
            </AppLayout>
          }
        />

        {/* صفحه وضعیت */}
        <Route
          path="/status"
          element={
            <AppLayout theme={theme}>
              <Status />
              <BottomNav theme={theme} />
            </AppLayout>
          }
        />

        {/* مسیرهای نامعتبر */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
