import { useRef, useState } from "react";
import { Button } from "reactstrap";
import { perks } from "../data/perksArray";
import PerkBox from "./perks/PerkBox";

export default function PerkWheel({ setPerks }) {
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
      setPerks([...prevPerks]);
      return [...prevPerks];
    });
  };

  return (
    <div className="perk-wheel">
      <PerkBox selectedPerks={selectedPerks} />
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
    </div>
  );
}
