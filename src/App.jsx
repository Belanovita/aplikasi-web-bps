// src/App.jsx
import React from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";
import PublicationListPage from "./components/PublicationListPage";
import AddPublicationPage from "./components/AddPublicationPage";
import EditPublicationPage from "./components/Edit";
import PublicationDetailPage from "./components/PublicationDetailPage";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <div
      className="relative min-h-screen font-sans bg-cover bg-center"
      style={{
        backgroundImage: "url('https://ppid.bps.go.id/upload/img/kantor_bps_pusat.jpg')"
      }}
    >
      {/* Overlay semi-transparent */}
      <div className="absolute inset-0 bg-black bg-opacity-20 z-0" />

      {/* Konten utama */}
      <div className="relative z-10 min-h-screen">
        <Navbar />
        <main className="p-4 sm:p-6 lg:p-8">
          <Routes>
            {/* Public Route */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Routes */}
            <Route
              path="/publications"
              element={
                <ProtectedRoute>
                  <PublicationListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/publications/add"
              element={
                <ProtectedRoute>
                  <AddPublicationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/publications/edit/:id"
              element={
                <ProtectedRoute>
                  <EditPublicationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/publications/detail/:id"
              element={
                <ProtectedRoute>
                  <PublicationDetailPage />
                </ProtectedRoute>
              }
            />

            {/* Redirect Routes */}
            <Route path="/" element={<Navigate to="/publications" replace />} />
            <Route path="*" element={<Navigate to="/publications" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}
