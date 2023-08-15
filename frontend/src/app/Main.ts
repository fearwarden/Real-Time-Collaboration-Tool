import CommandManager from "./commands/CommandManager";
import AgentManager from "./content/agents/AgentManager";
import ActionManager from "./controller/actions/ActionManager";
import Strategy from "./models/Strategy";
import DrawingStateManager from "./state/drawing/DrawingStateManager";
import Canvas from "./view/Canvas";
import SideMenuView, { SideMenuElementes } from "./view/SideMenuView";
import StompClient from "./ws/StompClient";
import SubscriptionManager from "./ws/subscriptions/SubscriptionManager";
import { v4 as generateUUID } from "uuid";

export default class Main {
  private _subscriptionManager: SubscriptionManager;

  private _actionManager: ActionManager;

  private _commandManager: CommandManager;

  private _agentManager: AgentManager;

  private _canvas: Canvas | null = null;

  private _strategyModel: Strategy;

  private _stompClient: StompClient;

  private _userId: string = generateUUID();

  private static _instance: Main | null = null;

  private _sideMenuView: SideMenuView | null;

  private _drawingStateManager: DrawingStateManager;

  private constructor() {
    this._subscriptionManager = new SubscriptionManager();
    this._stompClient = new StompClient();
    this._strategyModel = new Strategy();
    this._actionManager = new ActionManager();
    this._commandManager = new CommandManager();
    this._agentManager = new AgentManager();
    this._sideMenuView = null;
    this._drawingStateManager = new DrawingStateManager();
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

  public get canvas(): Canvas {
    if (this._canvas == null) {
      throw new Error("Canvas is not initialized.");
    }
    return this._canvas;
  }
  public set canvas(value: HTMLCanvasElement) {
    this._canvas = new Canvas(value);
    this._canvas.start();
  }

  public get strategyModel(): Strategy {
    return this._strategyModel;
  }
  public set strategyModel(value: Strategy) {
    this._strategyModel = value;
  }
  public get actionManager(): ActionManager {
    return this._actionManager;
  }
  public set actionManager(value: ActionManager) {
    this._actionManager = value;
  }
  public get commandManager(): CommandManager {
    return this._commandManager;
  }
  public set commandManager(value: CommandManager) {
    this._commandManager = value;
  }
  public get agentManager(): AgentManager {
    return this._agentManager;
  }
  public set agentManager(value: AgentManager) {
    this._agentManager = value;
  }
  public get sideMenuView(): SideMenuView {
    if (this._sideMenuView == null) {
      throw new Error("Side Menu is not initialized.");
    }
    return this._sideMenuView;
  }
  public set sideMenuView(value: SideMenuElementes) {
    this._sideMenuView = new SideMenuView(value);
  }
  public get drawingStateManager(): DrawingStateManager {
    return this._drawingStateManager;
  }

  public static getInstance(): Main {
    if (this._instance == null) {
      this._instance = new Main();
    }
    return this._instance;
  }
}
