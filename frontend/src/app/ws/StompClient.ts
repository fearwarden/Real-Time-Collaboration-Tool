import { CompatClient, IMessage, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import AbstractSubscription from "./subscriptions/ISubscription";
import Main from "../Main";

export default class StompClient {
	private _stompClient: CompatClient | null = null;

	private stompInitialized: boolean = false;

	public connect(): void {
		const socket = new SockJS("http://localhost:8080/ws");
		this.stompClient = Stomp.over(socket);
		if (this._stompClient == null) {
			throw new Error("Stomp client not initialized.");
		}
		this.stompClient.debug = () => {};

		const subscriptions: AbstractSubscription[] =
			Main.getInstance().subscriptionManager.getSubscriptions();

		const subMap = new Map<string, ((message: IMessage) => void)[]>();

		for (let i = 0; i < subscriptions.length; i++) {
			const sub = subscriptions[i];

			if (subMap.has(sub.topic)) {
				subMap.get(sub.topic)!.push(sub.callback);
			} else {
				subMap.set(sub.topic, [sub.callback]);
			}
		}
		this.stompClient.connect({}, () => {
			for (const key of subMap.keys()) {
				this.stompClient!.subscribe(key, (message: IMessage) => {
					for (const callback of subMap.get(key)!) {
						callback(message);
					}
				});
			}
			this.stompInitialized = true;
		});
	}

	public disconnect(): void {
		if (!this.stompClient || !this.stompInitialized) return;
		this.stompClient.disconnect();
	}

	public send(endpoint: string, message: unknown): void {
		if (!this.stompInitialized || this.stompClient == null) return;
		this.stompClient.send(endpoint, {}, JSON.stringify(message));
	}

	public get stompClient(): CompatClient | null {
		return this._stompClient;
	}
	public set stompClient(value: CompatClient | null) {
		this._stompClient = value;
	}
}
