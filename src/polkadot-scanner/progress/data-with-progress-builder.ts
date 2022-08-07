import { Subject, Observable } from "rxjs";
import { DataWithProgress } from "./data-with-progress";
import { PromisesSubscriptionChunks } from "./promises-subscription-chunks";

/**
 * Tool to build an observable with results and progress
 * from promises builders
 */
export class DataWithProgressBuilder<T> {
    private resultSubject = new Subject<DataWithProgress<T>>();
    private data: T[] = [];
    private totalCount = 0;
    private resolvedCount = 0;

    public constructor(private builders: (() => Promise<T[]>)[]) {
        this.totalCount = this.builders.length;
        new PromisesSubscriptionChunks(this.builders, (promise) =>
            this.subscribeToPromise(promise)
        ).subscribeToAll();
    }

    public get results(): Observable<DataWithProgress<T>> {
        return this.resultSubject.asObservable();
    }

    private subscribeToPromise(promise: Promise<T[]>) {
        promise
            .then((requestData: T[]) => this.onPromiseResolve(requestData))
            .catch((error) => this.resultSubject.error(error));
    }

    private onPromiseResolve(requestData: T[]) {
        this.data.push(...requestData);
        this.resolvedCount++;
        this.publish();
    }

    private publish() {
        const progressRatio = this.resolvedCount / this.totalCount;
        this.resultSubject.next({ data: this.data, progressRatio: progressRatio });
        if (this.resolvedCount === this.totalCount) {
            this.resultSubject.complete();
        }
    }
}
