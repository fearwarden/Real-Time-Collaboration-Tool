import ISubscriber from "./ISubscriber";

export default interface IPublisher {
	notifySubscribers(notification: unknown): void;
	addSubscriber(subscriber: ISubscriber): void;
	removeSubscriber(subscriber: ISubscriber): void;
}
