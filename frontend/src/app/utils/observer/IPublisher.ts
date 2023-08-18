import ISubscriber from "./ISubscriber";

export default interface IPublisher {
	notifySubscribers(notification: any): void;
	addSubscriber(subscriber: ISubscriber): void;
	removeSubscriber(subscriber: ISubscriber): void;
}
