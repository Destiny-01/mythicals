import React, { useState, useEffect } from "react";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  Button,
} from "reactstrap";
import Logo from "../assets/Logo.svg";
import { useLocation } from "react-router-dom";
import SelectWallet from "./modals/SelectWallet";
import Avatar1 from "../assets/Avatar1.png";

export default function NavbarWrapper() {
  const [isToggled, setIsToggled] = useState(false);
  const [address, setAddress] = useState("");
  useEffect(() => {
    window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
      accounts.length > 0 && setAddress(accounts[0]);
      localStorage.setItem("_metamask", accounts[0]);
    });
  }, []);
  let location = useLocation();
  console.log(address);

  return (
    <div>
      <Navbar expand="md" className="p-0 m-0" dark>
        <NavbarBrand href="/" className="p-0 pe-md-5">
          <img src={Logo} alt="" />
        </NavbarBrand>
        <NavbarToggler onClick={() => setIsToggled(!isToggled)} />
        <Collapse navbar isOpen={isToggled}>
          <Nav
            className={`mx-auto ps-md-5  ${
              location.pathname === "/" ? "d-flex" : "d-none"
            }`}
            navbar
          >
            <NavItem>
              <NavLink active href="#" className="active">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Marketplace</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Token</NavLink>
            </NavItem>
          </Nav>
          <Nav className={`${location.pathname === "/" ? "ms-0" : "ms-auto"}`}>
            {address ? (
              <div className="loggedin cad d-flex align-items-center">
                <div className="">
                  <img src={Avatar1} alt="" className="me-2" />
                </div>

                <p className="m-0">
                  {address.slice(0, 5)}...{address.slice(-5)}
                </p>
              </div>
            ) : (
              <SelectWallet />
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
