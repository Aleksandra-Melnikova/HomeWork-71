import { NavLink, useLocation } from "react-router-dom";
import "./Toolbar.css";
import { useEffect, useState } from "react";

const ToolBar = () => {
  const [show, setShow] = useState<"d-block" | "d-none">("d-block");
  const location = useLocation();
  const [title,setTitle] = useState("Turlte Pizza Admin");

  useEffect(() => {
    if (location.pathname === "/") {
      setShow("d-none");
     setTitle('Turlte Pizza');
    } else {
      setShow("d-block");
      setTitle('Turlte Pizza Admin');
    }
  }, [location.pathname]);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container d-flex align-items-center justify-content-between">
          <NavLink to="/">
            <span className="navbar-brand mb-0 text-white fs-1">
              {title}
            </span>
          </NavLink>
          <div className="ms-5">
            <ul className={`navbar-nav ${show}`}>
              <li className="nav-item d-inline-block">
                <NavLink
                  className="nav-link btn button-add text-primary bg-white me-3 "
                  to="/admin/dishes"
                >
                  Dishes
                </NavLink>
              </li>
              <li className="nav-item d-inline-block">
                <NavLink
                  className="nav-link btn button-add text-primary bg-white "
                  to="/admin/orders"
                >
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
