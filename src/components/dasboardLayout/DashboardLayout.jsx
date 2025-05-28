import { useState } from "react";
import { FiLock, FiLogOut, FiPackage, FiUser } from "react-icons/fi";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CHANGE_PASSWORD, EDIT_PROFILE, LOGIN, PRODUCTS } from "../../utils/helper";
import "./dashboard.css";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    navigate(LOGIN);
  };


  const closeMobileMenu = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const isActiveLink = (path) => {
    return location.pathname === path || (path !== "/" && location.pathname.startsWith(path));
  };

  const navLinks = [
    {
      to: EDIT_PROFILE,
      label: "Edit Profile",
      icon: <FiUser />,
    },
    {
      to: CHANGE_PASSWORD,
      label: "Change Password",
      icon: <FiLock />,
    },
    {
      to: PRODUCTS,
      label: "Products",
      icon: <FiPackage />,
    },
  ];

  return (
    <div className="dashboard-wrapper">
      <nav className="dashboard-navbar">
        <Link to="/" className="dashboard-logo" onClick={closeMobileMenu}>
          My App
        </Link>

        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          ☰
        </button>

        {/* Navigation Links */}
        <div className={`dashboard-links ${isMobileMenuOpen ? 'mobile-open' : ''}`} role="navigation">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className={`dashboard-link ${isActiveLink(link.to) ? 'active' : ''}`}
              onClick={closeMobileMenu}
              title={link.label}
              aria-current={isActiveLink(link.to) ? "page" : undefined}
            >
              <span className="link-icon">{link.icon}</span>
              <span className="link-text">{link.label}</span>
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="dashboard-link logout-button"
            title="Logout"
          >
            <span className="link-icon"><FiLogOut /></span>
            <span className="link-text">Logout</span>
          </button>
        </div>
      </nav>

      <main className="dashboard-content">
        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;