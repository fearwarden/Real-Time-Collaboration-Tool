export default interface ISubscriber {
    onNotificationRecieved(notification: any): void;
}