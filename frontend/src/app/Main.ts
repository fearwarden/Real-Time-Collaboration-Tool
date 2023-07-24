import Canvas from "./Canvas";
import StompClient from "./ws/StompClient";
import SubscriptionManager from "./ws/subscriptions/SubscriptionManager";
import { v4 as generateUUID} from "uuid";

export default class Main {
    
    private subscriptionManager: SubscriptionManager;
    private canvas: Canvas | null = null;

    private stompClient: StompClient;

    private userId: string = generateUUID();

    private static _instance: Main | null = null;

    private constructor(){
        this.subscriptionManager = new SubscriptionManager();
        this.stompClient = new StompClient();
    }

    public get getSubscriptionManager() : SubscriptionManager {
        return this.subscriptionManager;
    }

    public get getUserId(): string {
        return this.userId;
    }

    public get getStompClient(): StompClient {
        return this.stompClient;
    }

    public set setCanvas(canvasElement: HTMLCanvasElement) {
        this.canvas = new Canvas(canvasElement);
    }

    public get getCanvas(): Canvas {
        if(this.canvas == null) {
            throw new Error("Canvas is not initialized.");
        }
        return this.canvas;
    }

    public static getInstance(): Main {
        if(this._instance == null) {
            this._instance = new Main();
        }
        return this._instance;
    }

}