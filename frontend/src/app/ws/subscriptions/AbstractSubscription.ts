export default abstract class AbstractSubscription {
    private _topic: string;

    private _callback: (message: any) => void;

    constructor(topic: string, callback: (message: any) => void) {
        this._topic = topic;
        this._callback = callback;
    }

    public get getTopic(): string {
        return this.topic;
    }
    public get callback(): (message: any) => void {
        return this._callback;
    }
    public set callback(value: (message: any) => void) {
        this._callback = value;
    }
    public get topic(): string {
        return this._topic;
    }
    public set topic(value: string) {
        this._topic = value;
    }

}