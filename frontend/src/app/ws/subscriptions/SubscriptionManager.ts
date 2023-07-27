import AbstractSubscription from "./AbstractSubscription";
import MousePositionSubscription from "./literals/MousePositionSubscription";

export default class SubscriptionManager {
    private mousePositionSubscription: MousePositionSubscription;

    constructor() {
        this.mousePositionSubscription = new MousePositionSubscription();
    }

    public get getMousePositionSubscription(): MousePositionSubscription {
        return this.mousePositionSubscription;
    }

    public getSubscriptions(): AbstractSubscription[] {
        return [
            this.mousePositionSubscription
        ]
    }
}