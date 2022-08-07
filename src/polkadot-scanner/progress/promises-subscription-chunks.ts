/**
 * Tool to asynchronously build and launch a large amount of promises
 */
export class PromisesSubscriptionChunks<T> {
    private readonly chunkSize = 20;

    constructor(
        private promisesBuilders: (() => Promise<T>)[],
        private subscribeToPromise: (promise: Promise<any>) => any
    ) {}

    public subscribeToAll(): void {
        const promisesBuildersChunks: (() => Promise<T>)[][] = this.buildChunks();
        this.subscribeToChunkAndNextChunks(promisesBuildersChunks, 0);
    }

    private subscribeToChunkAndNextChunks(
        promisesBuildersChunks: (() => Promise<T>)[][],
        i: number
    ) {
        if (i === promisesBuildersChunks.length) {
            return;
        }
        const promises = promisesBuildersChunks[i].map((b) => b());
        for (const promise of promises) {
            this.subscribeToPromise(promise);
        }
        Promise.all(promises).then(() =>
            this.subscribeToChunkAndNextChunks(promisesBuildersChunks, i + 1)
        );
    }

    private buildChunks() {
        const buildersChunks: (() => Promise<T>)[][] = [];
        for (let i = 0; i < this.promisesBuilders.length; i += this.chunkSize) {
            buildersChunks.push(this.promisesBuilders.slice(i, i + this.chunkSize));
        }
        return buildersChunks;
    }
}
