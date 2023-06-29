import { useRef, useState } from "react";
import { Button } from "reactstrap";
import Time from "../assets/perks/time.svg";
import Magician from "../assets/perks/magician.svg";
import Shuffler from "../assets/perks/shuffler.svg";
import Enchanter from "../assets/perks/enchanter.svg";
import Saint from "../assets/perks/saint.svg";
import Trickster from "../assets/perks/trickster.svg";
import PerkDefault from "../assets/perks/default.svg";

const perks = [
  {
    title: "Time Master",
    description: "Doubles your time for that given round",
    gradient: ["#0442A5", "#268DB9"],
    img: Time,
  },
  {
    title: "Magician",
    description: "Gives you an extra turn",
    gradient: ["#AD10E5", "#41125D"],
    img: Magician,
  },
  {
    title: "Saint",
    description: "Makes you immune to opponents perks",
    gradient: ["#FA7856", "#FEF062"],
    img: Saint,
  },
  {
    title: "Enchanter",
    description: "Makes an opponent show his card status during that round",
    gradient: ["#8F0F4A", "#D0944F"],
    img: Enchanter,
  },
  {
    title: "Trickster",
    description: "Swaps one egg out of your crate with another egg",
    gradient: ["#CA0863", "#FF79F0"],
    img: Trickster,
  },
  {
    title: "Shuffler",
    description: "Randomly rearranges opponent's egg rack 4 times in his round",
    gradient: ["#59005B", "#FFD470"],
    img: Shuffler,
  },
];
export default function PerkWheel() {
  const ref = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPerks, setSelectedPerks] = useState([null, null, null, null]);

  function className(i) {
    if (i === currentIndex) {
      return "text-center";
    } else if (i === currentIndex - 1) {
      return "text-end";
    } else {
      return "text-start";
    }
  }

  const slideNext = () => {
    if (currentIndex === perks.length) {
      return;
    }
    ref.current.style.transform = `translateX(-${(currentIndex + 1) * 90}%)`;
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const slidePrev = () => {
    if (currentIndex === 0) {
      return;
    }
    ref.current.style.transform = `translateX(-${(currentIndex - 1) * 90}%)`;
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const selectPerk = () => {
    if (
      selectedPerks.includes(currentIndex) ||
      selectedPerks.filter(Boolean).length > 3
    ) {
      return;
    }

    setSelectedPerks((prevPerks) => {
      const index = prevPerks.findIndex((x) => x === null);
      prevPerks[index] = currentIndex;
      console.log(index, prevPerks, currentIndex);
      return [...prevPerks];
    });
  };

  return (
    <>
      <div className="chart-container">
        <div className="perks-wrapper">
          {console.log(selectedPerks)}
          {selectedPerks.map((perkId) => (
            <div className={perkId != null ? "perk" : "perk-default"}>
              {perkId != null ? (
                <img
                  src={perks[perkId].img}
                  style={{
                    background: `linear-gradient(357deg, ${perks[perkId].gradient[0]} 0%, ${perks[perkId].gradient[1]} 100%)`,
                  }}
                  alt={perks[perkId].name}
                />
              ) : (
                <div className="perk-default">
                  <img src={PerkDefault} alt="default" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="perks my-3" ref={ref}>
        {perks.map((perk, i) => (
          <div key={i} className={className(i) + " perk"}>
            <img
              src={perk.img}
              style={{
                background: `linear-gradient(357deg, ${perks[i].gradient[0]} 0%, ${perks[i].gradient[1]} 100%)`,
              }}
              alt={perk.name}
            />
          </div>
        ))}
      </div>
      <div className="text-center">
        <p>{perks[currentIndex].title}</p>
        <p class="text-gray caption">{perks[currentIndex].description}</p>
        <div className="d-flex align-items-center justify-content-between">
          <div
            style={{ minHeight: "24px", minWidth: "24px" }}
            role="button"
            onClick={slidePrev}
          >
            <i className="bi bi-chevron-left"></i>
          </div>
          <Button
            className="secondary-btn"
            disabled={selectedPerks.filter(Boolean).length > 3}
            onClick={selectPerk}
          >
            Select Perk
          </Button>
          <div
            style={{ minHeight: "24px", minWidth: "24px" }}
            role="button"
            onClick={slideNext}
          >
            <i className="bi bi-chevron-right"></i>
          </div>
        </div>
      </div>
    </>
  );
}
