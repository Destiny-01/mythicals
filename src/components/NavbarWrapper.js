import React, { useState, useEffect } from "react";
import {
  Button,
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import Logo from "../assets/Logo.svg";
import { useLocation } from "react-router-dom";
import SelectWallet from "./modals/SelectWallet";
import Avatar1 from "../assets/Avatar1.png";

export default function NavbarWrapper() {
  const [isToggled, setIsToggled] = useState(false);
  const [logoutToggle, setLogoutToggle] = useState(false);
  const [address, setAddress] = useState("");
  const disconnect = () => {
    localStorage.removeItem("_metamask");
    sessionStorage.removeItem("address");
    sessionStorage.removeItem("pk");
    setAddress("");
  };
  let location = useLocation();

  useEffect(() => {
    if (!address) {
      if (window.ethereum) {
        if (window.ethereum.selectedAddress) {
          setAddress(window.ethereum.selectedAddress);
        } else {
          window.ethereum
            .request({ method: "eth_accounts" })
            .then((accounts) => {
              accounts.length > 0 && setAddress(accounts[0]);
              !localStorage.getItem("_metamask") &&
                localStorage.setItem("_metamask", accounts[0]);
            });
        }
      } else {
        sessionStorage.getItem("address") &&
          setAddress(sessionStorage.getItem("address"));
      }
    }
  }, [address]);

  return (
    <div>
      <Navbar expand="md" className="p-0 m-0" dark>
        <NavbarBrand href="/" className="p-0 pe-md-5">
          <img src={Logo} alt="WOw" />
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
              <>
                <div
                  className="loggedin cad d-flex align-items-center"
                  onClick={() => setLogoutToggle(!logoutToggle)}
                >
                  <div className="">
                    <img src={Avatar1} alt="" className="me-2" />
                  </div>

                  <p className="m-0">
                    {address.slice(0, 5)}...{address.slice(-5)}
                  </p>
                </div>
                <Collapse isOpen={logoutToggle} horizontal>
                  <Button
                    style={{ marginLeft: "8px" }}
                    onClick={() => {
                      disconnect();
                      setLogoutToggle(false);
                    }}
                  >
                    Disconnect
                  </Button>
                </Collapse>
              </>
            ) : (
              <SelectWallet />
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
