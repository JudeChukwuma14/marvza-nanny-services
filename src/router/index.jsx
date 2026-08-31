import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import ScrollToTop from "../components/common/ScrollToTop";
import WhatsAppButton from "../components/common/WhatsAppButton";
import HomePage from "../pages/public/HomePage";
import ServicesPage from "../pages/public/ServicesPage";
import ServiceDetailPage from "../pages/public/ServiceDetailPage";
import AboutPage from "../pages/public/AboutPage";
import ContactPage from "../pages/public/ContactPage";
import HowItWorksPage from "../pages/public/HowItWorksPage";
import ForFamiliesPage from "../pages/public/ForFamiliesPage";
import ForNanniesPage from "../pages/public/ForNanniesPage";
import FAQsPage from "../pages/public/FAQsPage";
import PrivacyPolicyPage from "../pages/public/PrivacyPolicyPage";
import CookiePolicyPage from "../pages/public/CookiePolicyPage";
import TermsPage from "../pages/public/TermsPage";
import SafeguardingPolicyPage from "../pages/public/SafeguardingPolicyPage";
import ComplaintsProcedurePage from "../pages/public/ComplaintsProcedurePage";
import ManniesPage from "../pages/public/ManniesPage";

import RequestNannyPage from "../pages/parent/RequestNannyPage";
import RequestConfirmationPage from "../pages/parent/RequestConfirmationPage";

import ApplyPage from "../pages/ApplyPage";
import ConfirmationPage from "../pages/ConfirmationPage";
import AdminLoginPage from "../pages/admin/AdminLoginPage";
import AdminApplicationsPage from "../pages/admin/AdminApplicationsPage";
import AdminApplicationDetailPage from "../pages/admin/AdminApplicationDetailPage";
import AdminProtectedRoute from "../pages/admin/AdminProtectedRoute";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminFamiliesPage from "../pages/admin/AdminFamiliesPage";
import AdminFamilyDetailPage from "../pages/admin/AdminFamilyDetailPage";
import AdminBookingsPage from "../pages/admin/AdminBookingsPage";
import AdminBookingDetailPage from "../pages/admin/AdminBookingDetailPage";
import AdminEnquiriesPage from "../pages/admin/AdminEnquiriesPage";
import AdminEnquiryDetailPage from "../pages/admin/AdminEnquiryDetailPage";
import AdminNanniesPage from "../pages/admin/AdminNanniesPage";
import AdminNannyDetailPage from "../pages/admin/AdminNannyDetailPage";
import AdminDocumentsPage from "../pages/admin/AdminDocumentsPage";
import AdminAvailabilityPage from "../pages/admin/AdminAvailabilityPage";
import AdminChildrenPage from "../pages/admin/AdminChildrenPage";
import AdminUsersPage from "../pages/admin/AdminUsersPage";
import AdminAuditLogPage from "../pages/admin/AdminAuditLogPage";
import AdminContentPage from "../pages/admin/AdminContentPage";
import AdminCommunicationsPage from "../pages/admin/AdminCommunicationsPage";

/** Hides the WhatsApp button on admin routes — it's a public-contact affordance, not an admin tool. */
function GlobalWhatsAppButton() {
  const location = useLocation();
  if (location.pathname.startsWith("/admin")) return null;
  return <WhatsAppButton />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <GlobalWhatsAppButton />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />

        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/for-families" element={<ForFamiliesPage />} />
        <Route path="/for-nannies" element={<ForNanniesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faqs" element={<FAQsPage />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/cookie-policy" element={<CookiePolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/safeguarding" element={<SafeguardingPolicyPage />} />
        <Route path="/complaints" element={<ComplaintsProcedurePage />} />
        <Route path="/mannies" element={<ManniesPage />} />

        {/* Parent Request routes */}
        <Route path="/request-nanny" element={<RequestNannyPage />} />
        <Route
          path="/request-nanny/confirmation"
          element={<RequestConfirmationPage />}
        />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/apply/confirmation" element={<ConfirmationPage />} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminDashboardPage />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/applications"
          element={
            <AdminProtectedRoute>
              <AdminApplicationsPage />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/applications/:id"
          element={
            <AdminProtectedRoute>
              <AdminApplicationDetailPage />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/enquiries"
          element={
            <AdminProtectedRoute>
              <AdminEnquiriesPage />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/enquiries/:id"
          element={
            <AdminProtectedRoute>
              <AdminEnquiryDetailPage />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/families"
          element={
            <AdminProtectedRoute>
              <AdminFamiliesPage />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/families/:id"
          element={
            <AdminProtectedRoute>
              <AdminFamilyDetailPage />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/children"
          element={
            <AdminProtectedRoute>
              <AdminChildrenPage />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/nannies"
          element={
            <AdminProtectedRoute>
              <AdminNanniesPage />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/nannies/:id"
          element={
            <AdminProtectedRoute>
              <AdminNannyDetailPage />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/bookings"
          element={
            <AdminProtectedRoute>
              <AdminBookingsPage />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/bookings/:id"
          element={
            <AdminProtectedRoute>
              <AdminBookingDetailPage />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/availability"
          element={
            <AdminProtectedRoute>
              <AdminAvailabilityPage />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/documents"
          element={
            <AdminProtectedRoute>
              <AdminDocumentsPage />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/communications"
          element={
            <AdminProtectedRoute>
              <AdminCommunicationsPage />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/content"
          element={
            <AdminProtectedRoute>
              <AdminContentPage />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminProtectedRoute>
              <AdminUsersPage />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/audit-log"
          element={
            <AdminProtectedRoute>
              <AdminAuditLogPage />
            </AdminProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
