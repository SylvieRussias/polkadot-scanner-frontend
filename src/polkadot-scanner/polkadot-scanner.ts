import { ApiPromise, WsProvider } from "@polkadot/api";
import { EventFromBlockToBlockScanner } from "./events-from-block-to-block-scanner";
import { makeAutoObservable, configure } from "mobx";
import { Subscription } from "rxjs";
import { scannerOptionsblockToNumber, ScanOptions } from "./scan-options";
import { DEFAULT_SCAN_OPTIONS } from "../config/default-scan-options";
import { EventSummary } from "./event-summary/event-summary";
import { DataWithProgress } from "./progress/data-with-progress";
import { ScannerStateInfo } from "./scanner-state-info/scanner-state-info";
import { ScannerState } from "./scanner-state-info/scanner-state";

configure({ enforceActions: "never" });

export class PolkadotScanner {
    private _stateInfo: ScannerStateInfo = { state: ScannerState.READY };
    private _loadedEvents: DataWithProgress<EventSummary> = { data: [] };
    private _hasLoadedLastBlock = false;
    private api?: ApiPromise;
    private eventsSubscription?: Subscription;
    public scanOptions: ScanOptions = DEFAULT_SCAN_OPTIONS;
    private readonly errorHandler = (): void => this.setError();

    constructor() {
        makeAutoObservable(this);
    }

    public get stateInfo(): ScannerStateInfo {
        return this._stateInfo;
    }

    public get hasLoadedLastBlock(): boolean {
        return this._hasLoadedLastBlock;
    }

    public get loadedEvents(): DataWithProgress<EventSummary> {
        return this._loadedEvents;
    }

    public async loadApiAndLastBlock() {
        this.setInfo(ScannerState.LOADING_API);
        await this.initApi();

        this.setInfo(ScannerState.LOADING_LAST_BLOCK);
        await this.setLastBlockAsDefaultBlock();

        this.setInfo(ScannerState.READY);
        this._hasLoadedLastBlock = true;
    }

    public async scanEvents(options: ScanOptions) {
        this.setInfo(ScannerState.SCANNING);
        this._loadedEvents = { data: [], progressRatio: 0 };

        const shouldReloadApi = this.scanOptions.endpoint !== options.endpoint;
        this.scanOptions = options;
        if (shouldReloadApi) {
            await this.initApi();
        }

        this.getEventsFromBlockToBlock(
            scannerOptionsblockToNumber(options.startBlock!),
            scannerOptionsblockToNumber(options.endBlock!)
        );
    }

    private getEventsFromBlockToBlock(startBlock: number, endBlock: number): void {
        if (this.eventsSubscription) this.eventsSubscription.unsubscribe();
        this.eventsSubscription = new EventFromBlockToBlockScanner(this.api!)
            .scan(startBlock, endBlock)
            .subscribe({
                next: (response) => (this._loadedEvents = response),
                error: (error) => this.setError(error),
                complete: () => this.setInfo(ScannerState.READY),
            });
    }

    private async initApi() {
        this.api?.off("error", this.errorHandler);
        this.api = new ApiPromise({ provider: new WsProvider(this.scanOptions.endpoint) });
        this.api.on("error", this.errorHandler);
        await this.api.isReady;
    }

    private async setLastBlockAsDefaultBlock() {
        const block: any = await this.api!.rpc.chain.getBlock();
        const lastBlock = block.toHuman().block.header.number;
        this.scanOptions = { ...this.scanOptions, startBlock: lastBlock, endBlock: lastBlock };
    }

    private setInfo(newState: ScannerState): void {
        this._stateInfo = { state: newState };
    }

    private setError(error?: any): void {
        const errorMessage = error
            ? error.toString()
            : "Unable to connect. Please check your endpoint and connection";
        this._stateInfo = { state: ScannerState.ERROR, errorMessage: errorMessage };
    }
}
