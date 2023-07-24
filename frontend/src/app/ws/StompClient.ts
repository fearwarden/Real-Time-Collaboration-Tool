import { CompatClient, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import AbstractSubscription from "./subscriptions/AbstractSubscription";
import Main from "../Main";
import { AnyCnameRecord } from "dns";

export default class StompClient {

    private stompClient: CompatClient | null = null;
    
    public connect(): void {
        var socket = new SockJS('http://localhost:8080/ws');
        this.stompClient = Stomp.over(socket);
        if(this.stompClient == null) {
            throw new Error("Stomp client not initialized.");
        }
        this.stompClient.debug = () => {};

        const subscriptions: AbstractSubscription[] = Main.getInstance().getSubscriptionManager.getSubscriptions();

        const subMap = new Map<string, Function[]>();

        for(let i = 0; i < subscriptions.length; i++) {
            const sub = subscriptions[i];

            if(subMap.has(sub.getTopic)){
                subMap.get(sub.getTopic)!.push(sub.getCallback);
            } else {
                subMap.set(sub.getTopic, [sub.getCallback]);
            }
        }
        this.stompClient.connect({}, (frame: any) => {
            for(let key of subMap.keys()) {
                this.stompClient!.subscribe(key, (message: any) => {
                    for(let callback of subMap.get(key)!) {
                        callback(message);
                    }
                });
            }
        });
    }

    public disconnect(): void {
        if(!this.stompClient) return;
        this.stompClient.disconnect();
    }

    public send(endpoint: string, message: any): void {
        if(this.stompClient == null) return;
        this.stompClient.send(endpoint, {}, JSON.stringify(message));
      }

}