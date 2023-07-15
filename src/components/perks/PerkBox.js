import React from "react";
import { perks } from "../../data/perksArray";
import PerkDefault from "../../assets/perks/default.svg";
import PerkLocked from "../../assets/perks/locked.svg";

export default function PerkBox({ selectedPerks }) {
  return (
    <div className="chart-container">
      <div className="perks-wrapper">
        {selectedPerks.map((perkId) => (
          <div className={perkId != null ? "perk" : "perk-default"}>
            {perkId != null && perkId > -1 ? (
              <img
                src={perks[perkId].img}
                style={{
                  background: `linear-gradient(357deg, ${perks[perkId].gradient[0]} 0%, ${perks[perkId].gradient[1]} 100%)`,
                }}
                alt={perks[perkId].name}
              />
            ) : perkId === -1 ? (
              <img
                src={PerkLocked}
                style={{
                  background:
                    "linear-gradient(0deg, rgba(173, 65, 35, 0.80) 0%, rgba(173, 65, 35, 0.80) 100%), url(<path-to-image>), lightgray 50% / cover no-repeat",
                  boxShadow:
                    "-4px -4px 8px 0px rgba(0, 0, 0, 0.30) inset, 4px 4px 8px 0px rgba(255, 255, 255, 0.30) inset",
                }}
                alt="default"
              />
            ) : (
              <img src={PerkDefault} alt="default" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
