import AbstractSubscription from "./AbstractSubscription";
import MousePositionSubsription from "./literals/MousePositionSubscription";

export default class SubscriptionManager {
    private mousePositionSubscription: MousePositionSubsription;

    constructor() {
        this.mousePositionSubscription = new MousePositionSubsription();
    }

    public get getMousePositionSubscription(): MousePositionSubsription {
        return this.mousePositionSubscription;
    }

    public getSubscriptions(): AbstractSubscription[] {
        return [
            this.mousePositionSubscription
        ]
    }
}