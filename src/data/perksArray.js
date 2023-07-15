import Time from "../assets/perks/time.svg";
import Magician from "../assets/perks/magician.svg";
import Shuffler from "../assets/perks/shuffler.svg";
import Enchanter from "../assets/perks/enchanter.svg";
import Saint from "../assets/perks/saint.svg";
import Trickster from "../assets/perks/trickster.svg";

export const perks = [
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
