import { EventSummary } from "./event-summary";

export class EventSummaryBuilder {
    constructor(private blockNumber: number, private event: any) {}

    public buildSummary(): EventSummary {
        return {
            blockNumber: this.blockNumber,
            name: `${this.event.method.section}.${this.event.method.method}`,
            arguments: this.event.toHuman().method.args,
            hash: this.event.hash.toHex(),
        };
    }
}
