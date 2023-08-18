import { IMessage } from "@stomp/stompjs";

export default interface ISubscription {
	get topic(): string;
	callback(message: IMessage): void;
}
