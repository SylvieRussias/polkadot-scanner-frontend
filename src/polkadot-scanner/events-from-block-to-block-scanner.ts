import { Observable } from "rxjs";
import { EventSummary } from "./event-summary/event-summary";
import { EventSummaryBuilder } from "./event-summary/event-summary-builder";
import { ApiPromise } from "@polkadot/api";
import { DataWithProgressBuilder } from "./progress/data-with-progress-builder";
import { DataWithProgress } from "./progress/data-with-progress";

export class EventFromBlockToBlockScanner {
    constructor(private api: ApiPromise) {}

    public scan(startBlock: number, endBlock: number): Observable<DataWithProgress<EventSummary>> {
        const promisesBuilders = [];
        for (let i = startBlock; i <= endBlock; i++) {
            promisesBuilders.push(() => this.getEventsByBlockNumber(i));
        }
        return new DataWithProgressBuilder(promisesBuilders).results;
    }

    private async getEventsByBlockNumber(blockNumber: number): Promise<EventSummary[]> {
        try {
            const blockHash = await this.api.rpc.chain.getBlockHash(blockNumber);
            const signedBlock = await this.api.rpc.chain.getBlock(blockHash);
            return this.buildBlockEventsSummary(blockNumber, signedBlock);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    private buildBlockEventsSummary(blockNumber: number, signedBlock: any): EventSummary[] {
        return signedBlock.block.extrinsics.map((ex: any) =>
            new EventSummaryBuilder(blockNumber, ex).buildSummary()
        );
    }
}
