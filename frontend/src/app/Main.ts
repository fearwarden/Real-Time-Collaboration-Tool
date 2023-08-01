import Strategy from "./models/Strategy";
import Canvas from "./view/Canvas";
import StompClient from "./ws/StompClient";
import SubscriptionManager from "./ws/subscriptions/SubscriptionManager";
import { v4 as generateUUID} from "uuid";

export default class Main {
    
    private _subscriptionManager: SubscriptionManager;
    
    private _canvas: Canvas | null = null;
    
    private _strategyModel: Strategy;
    
    private _stompClient: StompClient;
    

    private _userId: string = generateUUID();
    

    private static _instance: Main | null = null;
    

    private constructor(){
        this._subscriptionManager = new SubscriptionManager();
        this._stompClient = new StompClient();
        this._strategyModel = new Strategy();
    }

    public get subscriptionManager(): SubscriptionManager {
        return this._subscriptionManager;
    }
    public set subscriptionManager(value: SubscriptionManager) {
        this._subscriptionManager = value;
    }

    public get userId(): string {
        return this._userId;
    }
    public set userId(value: string) {
        this._userId = value;
    }

    public get stompClient(): StompClient {
        return this._stompClient;
    }
    public set stompClient(value: StompClient) {
        this._stompClient = value;
    }

    public get canvas(): Canvas | null {
        if(this._canvas == null) {
            throw new Error("Canvas is not initialized.");
        }
        return this._canvas;
    }
    public set canvas(value: HTMLCanvasElement) {
        this._canvas = new Canvas(value);
    }

    public get strategyModel(): Strategy {
        return this._strategyModel;
    }
    public set strategyModel(value: Strategy) {
        this._strategyModel = value;
    }

    public static getInstance(): Main {
        if(this._instance == null) {
            this._instance = new Main();
        }
        return this._instance;
    }
    

}