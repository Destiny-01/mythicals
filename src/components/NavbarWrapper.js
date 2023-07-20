import React, { useState } from "react";
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
import Logo from "../assets/Logo.png";
import LogoRound from "../assets/LogoRoundThick.png";
import Union from "../assets/Union.png";
import SelectWallet from "./modals/SelectWallet";
import Avatar1 from "../assets/Avatar1.png";
import { usePlayerContext } from "../context/PlayerContext";

export default function NavbarWrapper() {
  const [isToggled, setIsToggled] = useState(false);
  const [logoutToggle, setLogoutToggle] = useState(false);
  const { address, disconnect, player, balance } = usePlayerContext();

  return (
    <Navbar expand="md" className="p-0 m-0 pt-2" dark>
      <NavbarBrand href="/" className="p-0 pe-md-5">
        <img src={Logo} alt="WOw" />
      </NavbarBrand>
      <NavbarToggler onClick={() => setIsToggled(!isToggled)} />
      <Collapse navbar isOpen={isToggled}>
        <Nav className={`mx-auto ps-md-5 d-flex`} navbar>
          <NavItem>
            <NavLink active href="/" className="active">
              Home
              <div className="union">
                <img src={Union} alt="" className="mt-1" width={45} />
              </div>
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
        <Nav className={`ms-0`}>
          {address ? (
            <>
              <div
                className="loggedin cad d-flex gap-2 align-items-center"
                onClick={() => setLogoutToggle(!logoutToggle)}
              >
                <div className="">
                  <img src={Avatar1} alt="" className="" />
                </div>

                <p className="m-0 ">{player.username}</p>
                <div className="line"></div>
                <img src={LogoRound} alt="" />
                <p className="m-0 ">{balance} MYTH</p>
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
  );
}
