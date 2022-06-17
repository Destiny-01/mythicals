import React, { useState } from "react";
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

export default function NavbarWrapper() {
  const [isToggled, setIsToggled] = useState(false);
  let location = useLocation();
  const address = localStorage.getItem("_metamask");
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
            {address && window.ethereum.selectedAddress ? (
              <p>{address}</p>
            ) : (
              // address.substring(0, 5) + "..." + address.substring(19, 24)
              <SelectWallet />
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
