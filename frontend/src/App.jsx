import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Loader from "./components/Loader";

const Footer = React.lazy(() => import("./components/Footer"));
const NavbarCmp = React.lazy(() => import("./components/NavbarCmp"));
const AdminDashboard = React.lazy(() =>
  import("./screens/Admin/AdminDashboard")
);
const AdminLoginScreen = React.lazy(() =>
  import("./screens/Admin/AdminLoginScreen")
);
const AdminRegisterScreen = React.lazy(() =>
  import("./screens/Admin/AdminRegisterScreen")
);
const EditProfileScreen = React.lazy(() =>
  import("./screens/Admin/EditProfileScreen")
);
const ContactUsScreen = React.lazy(() => import("./screens/ContactUsScreen"));
const HomeScreen = React.lazy(() => import("./screens/HomeScreen"));
const NotFoundScreen = React.lazy(() => import("./screens/NotFoundScreen"));
const ProfileScreen = React.lazy(() => import("./screens/ProfileScreen"));
const FindTechniciansScreen = React.lazy(() =>
  import("./screens/Technician/FindTechniciansScreen")
);
const TechDashboard = React.lazy(() =>
  import("./screens/Technician/TechDashboard")
);
const TechLoginScreen = React.lazy(() =>
  import("./screens/Technician/TechLoginScreen")
);
const TechProfileScreen = React.lazy(() =>
  import("./screens/Technician/TechProfileScreen")
);
const TechRegisterScreen = React.lazy(() =>
  import("./screens/Technician/TechRegisterScreen")
);
const UserDashboard = React.lazy(() => import("./screens/User/UserDashboard"));
const UserLoginScreen = React.lazy(() =>
  import("./screens/User/UserLoginScreen")
);
const UserRegisterScreen = React.lazy(() =>
  import("./screens/User/UserRegisterScreen")
);
const Checkout = React.lazy(() => import("./screens/CheckoutScreen"));
const Success = React.lazy(() => import("./components/PaymentSuccess"));

function App() {
  return (
    <>
      <Suspense
        fallback={
          <section className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-700 flex flex-col justify-center items-center">
            <Loader />
          </section>
        }
      >
        <NavbarCmp />
        <Routes>
          <Route path="/" element={<HomeScreen />} exact />
          <Route path="/login" element={<UserLoginScreen />} />
          <Route path="/register" element={<UserRegisterScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/contact-us" element={<ContactUsScreen />} />
          <Route path="/technicians" element={<FindTechniciansScreen />} />
          <Route path="/technician/login" element={<TechLoginScreen />} />
          <Route path="/technician/register" element={<TechRegisterScreen />} />
          <Route path="/technician/dashboard" element={<TechDashboard />} />
          <Route path="/technician/:id" element={<TechProfileScreen />} />
          <Route path="/admin/login" element={<AdminLoginScreen />} />
          <Route path="/admin/register" element={<AdminRegisterScreen />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route
            path="/admin/edit/profile/:id"
            element={<EditProfileScreen />}
          />
          <Route path="/checkout/:cost" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
        <Footer />
      </Suspense>
    </>
  );
}

export default App;
