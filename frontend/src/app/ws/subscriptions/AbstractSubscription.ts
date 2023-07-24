export default abstract class AbstractSubscription {
    private topic: string;
    private callback: (message: any) => void;

    constructor(topic: string, callback: (message: any) => void) {
        this.topic = topic;
        this.callback = callback;
    }

    public get getTopic(): string {
        return this.topic;
    }
    public get getCallback(): (message: any) => void {
        return this.callback;
    }

}