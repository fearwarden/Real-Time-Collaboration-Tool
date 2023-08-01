export default interface ISubscriber {
    update(notification: any): void;
}