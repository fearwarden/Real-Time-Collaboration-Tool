export default interface ISubscriber {
	update(notification: unknown): void;
}
