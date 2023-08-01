import AbstractSpell from "../../AbstractSpell";
import OwlDroneImage from "../../../../../assets/img/agents/sova/Owl_Drone.webp";

export default class OwlDrone extends AbstractSpell {
  constructor() {
    super("Sova", "Owl Drone", OwlDroneImage, "basic");
  }
}
