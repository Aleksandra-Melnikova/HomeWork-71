import { NavLink, useLocation } from "react-router-dom";
import "./Toolbar.css";
import { useEffect, useState } from "react";

const ToolBar = () => {
  const [show, setShow] = useState<"d-block" | "d-none">("d-block");
  const location = useLocation();
  const [navigate, setNavigate] = useState("./admin");
  const [title, setTitle] = useState("Turlte Pizza Admin");

  useEffect(() => {
    if (location.pathname === "/") {
      setShow("d-none");
      setTitle("Turlte Pizza");
      setNavigate("./");
    } else {
      setShow("d-block");
      setTitle("Turlte Pizza Admin");
      setNavigate("./admin");
    }
  }, [location.pathname]);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container">
          <NavLink to={navigate}>
            <span className="navbar-brand mb-0 text-white fs-1">{title}</span>
          </NavLink>
          <div className="ms-5">
            <ul className={`navbar-nav ${show}`}>
              <li className="nav-item d-inline-block ">
                <NavLink className={`nav-link fs-4  `} to="/admin/dishes">
                  Dishes
                </NavLink>
              </li>
              <li className="nav-item d-inline-block">
                <NavLink className={`nav-link fs-4  `} to="/admin/orders">
                  Orders
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default ToolBar;
