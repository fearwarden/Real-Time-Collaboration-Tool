import AbstractSubscription from "./AbstractSubscription";
import MousePositionSubscription from "./literals/MousePositionSubscription";

export default class SubscriptionManager {
    private _mousePositionSubscription: MousePositionSubscription;
    

    constructor() {
        this._mousePositionSubscription = new MousePositionSubscription();
    }

    public get mousePositionSubscription(): MousePositionSubscription {
        return this._mousePositionSubscription;
    }
    public set mousePositionSubscription(value: MousePositionSubscription) {
        this._mousePositionSubscription = value;
    }

    public getSubscriptions(): AbstractSubscription[] {
        return [
            this.mousePositionSubscription
        ]
    }
}