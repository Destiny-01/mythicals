import React from "react";
import { Button, Input, InputGroup } from "reactstrap";
import Avatar1 from "../assets/Avatar1.png";
import ReactLoading from "react-loading";

export default function WaitingRoom() {
  return (
    <div className="waitingroom d-flex align-items-center justify-content-center">
      <div className=" text-center">
        <div className="d-flex justify-content-center  align-items-center mb-3 ">
          <div>
            <img src={Avatar1} alt="" />
          </div>

          <ReactLoading
            type="bubbles"
            // color=
            height={"10%"}
            width={"10%"}
          />
          <div>
            <img src={Avatar1} alt="" />
          </div>
        </div>

        <p className="mb-0"> Waiting for your opponent</p>
        <p className="caption">
          The game will begin once the opponent joins the room. <br />
          Share this code with your friend to pay with them
        </p>

        <InputGroup>
          <Input />
          <Button>To the Left!</Button>
        </InputGroup>
      </div>
    </div>
  );
}
