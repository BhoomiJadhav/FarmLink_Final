import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ContractProvider } from "./context/ContractContext";
import { AuthProvider } from "./context/AuthContext";

import Homepage from "./pages/home";
import FarmerContracts from "./pages/Dashboard/mycontract";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import FarmerDashboard from "./pages/Dashboard/Farmer";
import BuyerDashboard from "./pages/Dashboard/Buyer";
import ProfileWizard from "./pages/farmer/ProfileWizard";
import BuyerProfileComplete from "./pages/buyer/buyerprofile";
import PrivateRoute from "./components/privateRoute";
import ProfilePage from "./pages/farmer/profile";
import NegotiationsHub from "./pages/Dashboard/NegotiationsHub.jsx";
import ContractCreatePage from "./pages/Dashboard/ContractCreatePage";
import HarvestedCrop from "./pages/Dashboard/addHarvest";
import HarvestContractCreate from "./pages/Dashboard/HarvestContractCreate";
import Harvestcontract from "./pages/Dashboard/harvest-contract";
import HarvestContractTracking from "./pages/buyer/HarvestContractTracking";
import HarvestContractDetail from "./pages/buyer/HarvestContractDetails.jsx";
import DriverDelivery from "./pages/buyer/driver/driverDelivery.jsx";
import BuyerContracts from "./pages/buyer/buyerContracts.jsx";
import CultivationContractTracking from "./pages/cultivation/contractTracking.jsx";
import ContractDetailPage from "./pages/cultivation/contractDetails.jsx";
import GpsTest from "./pages/buyer/driver/GpsTest.jsx";
import ViewContractDocument from "./pages/cultivation/ViewContractDocument.jsx";
import Notifications from "./pages/Dashboard/Notifications.jsx";
import DriverCultivationDelivery from "./pages/cultivation/DriverCultivationDelivery.jsx";
import FarmerPolicy from "./pages/Dashboard/FarmerPolicy.jsx";
import AppLayout from "./layouts/appLayout";
import FarmerHarvestListings from "./pages/Dashboard/FarmerHarvestListings.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import UsersPage from "./pages/admin/UsersPage.jsx";
import DisputesPage from "./pages/admin/DisputesPage.jsx";
import PolicyVerificationPage from "./pages/admin/PolicyVerification.jsx";
import AdminSupport from "./pages/admin/AdminSupport.jsx";
import AdminAnalytics from "./pages/admin/AdminAnalytics.jsx";
import "./styles/pdf-safe.css";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ContractProvider>
          <Routes>
            <Route
              path="/"
              element={
                <AppLayout>
                  <Homepage />
                </AppLayout>
              }
            />
            <Route path="/farmer/contracts" element={<FarmerContracts />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/termsofservice" element={<TermsOfService />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route
              path="/notifications"
              element={
                <PrivateRoute allowedRoles={["farmer", "buyer"]}>
                  <Notifications />
                </PrivateRoute>
              }
            />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UsersPage />} />
            <Route path="/admin/disputes" element={<DisputesPage />} />
            <Route
              path="/admin/policies"
              element={<PolicyVerificationPage />}
            />
            <Route path="/admin/support" element={<AdminSupport />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="/farmer/harvest-crop" element={<HarvestedCrop />} />
            {/* Farmer Dashboard */}
            <Route
              path="/farmer/dashboard"
              element={
                <PrivateRoute
                  allowedRoles={["farmer"]}
                  mustHaveCompletedProfile={true}
                >
                  <FarmerDashboard />
                </PrivateRoute>
              }
            />

            {/* Farmer Profile Completion */}
            <Route
              path="/farmer/complete-profile"
              element={
                <PrivateRoute
                  allowedRoles={["farmer"]}
                  mustHaveCompletedProfile={false}
                >
                  <ProfileWizard />
                </PrivateRoute>
              }
            />

            {/* Buyer Profile Completion */}
            <Route
              path="/buyer/complete-profile"
              element={
                <PrivateRoute
                  allowedRoles={["buyer"]}
                  mustHaveCompletedProfile={false}
                >
                  <BuyerProfileComplete />
                </PrivateRoute>
              }
            />

            {/* Buyer Dashboard */}
            <Route
              path="/buyer/*"
              element={
                <PrivateRoute
                  allowedRoles={["buyer"]}
                  mustHaveCompletedProfile={true}
                >
                  <BuyerDashboard />
                </PrivateRoute>
              }
            />
            <Route path="/buyer/contracts" element={<BuyerContracts />} />
            {/* Buyer Contract Wizard */}
            {/* Buyer Contract Wizard */}
            <Route
              path="/buyer/cultivation-contract/:farmerId"
              element={
                <PrivateRoute
                  allowedRoles={["buyer"]}
                  mustHaveCompletedProfile={true}
                >
                  <ContractCreatePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/buyer/harvest-contract/:listingId"
              element={
                <PrivateRoute
                  allowedRoles={["buyer"]}
                  mustHaveCompletedProfile={true}
                >
                  <HarvestContractCreate />
                </PrivateRoute>
              }
            />
            <Route
              path="/farmer/harvest-contracts"
              element={<Harvestcontract />}
            />
            <Route
              path="/buyer/harvest-contract-tracking/"
              element={<HarvestContractTracking />}
            />
            <Route
              path="/buyer/harvest-contracts/:id"
              element={<HarvestContractDetail />}
            />
            <Route
              path="/farmer/harvest-contract-tracking"
              element={<HarvestContractTracking />}
            />
            <Route
              path="/farmer/harvest-contracts/:id"
              element={<HarvestContractDetail />}
            />
            <Route
              path="/farmer/harvest-listings"
              element={<FarmerHarvestListings />}
            />
            <Route
              path="/delivery/track/:contractId"
              element={<DriverDelivery />}
            />
            <Route path="/delivery/gps-test" element={<GpsTest />} />
            <Route path="/farmer/:id/profile" element={<ProfilePage />} />

            {/* <Route
              path="/cultivation/contract-tracking/:contractId"
              element={<CultivationContractTracking />}
            /> */}
            <Route
              path="/cultivation/contract-tracking"
              element={<CultivationContractTracking />}
            />

            <Route
              path="/contracts/:contractId"
              element={<ContractDetailPage />}
            />
            <Route
              path="/contracts/:contractId/document"
              element={<ViewContractDocument />}
            />
            <Route
              path="/delivery/cultivation/:contractId"
              element={<DriverCultivationDelivery />}
            />
            <Route
              path="/farmer/negotiations"
              element={<NegotiationsHub userRole="FARMER" />}
            />

            <Route
              path="/buyer/negotiations"
              element={<NegotiationsHub userRole="BUYER" />}
            />
            <Route path="/farmer/policy" element={<FarmerPolicy />} />
          </Routes>
        </ContractProvider>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
