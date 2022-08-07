import { PolkadotScanner } from "./polkadot-scanner";
import { DEFAULT_SCAN_OPTIONS } from "../config/default-scan-options";
import { wait } from "@testing-library/user-event/dist/utils";

/**
 * Warning : This test suite uses a remote API to run
 * (they can fail because of network problems)
 */
jest.setTimeout(30000);

test("Should set last block as end block", async () => {
    const scanner = await buildAndInitScanner();
    expect(scanner.scanOptions.endBlock).toMatch(/^[0-9,]*$/i);
});

test("Should fetch events with progress", async () => {
    const scanner = await buildAndInitScanner();
    await startScan(scanner, "100", "1,000");
    expect(scanner.loadedEvents.data.length).toBeGreaterThan(0);
    expect(scanner.loadedEvents.progressRatio).toBeGreaterThan(0);
    expect(scanner.loadedEvents.progressRatio).toBeLessThan(1);
});

test("Should start fetching events when a huge interval is selected", async () => {
    const scanner = await buildAndInitScanner();
    await startScan(scanner, "1", "10,000,000");
    expect(scanner.loadedEvents.data.length).toBeGreaterThan(0);
});

async function buildAndInitScanner() {
    const scanner = new PolkadotScanner();
    await scanner.loadApiAndLastBlock();
    return scanner;
}

async function startScan(
    scanner: PolkadotScanner,
    startBlock: string,
    endBlock: string,
    endpoint = DEFAULT_SCAN_OPTIONS.endpoint
) {
    scanner.scanEvents({
        startBlock: startBlock,
        endBlock: endBlock,
        endpoint: endpoint,
    });
    await wait(15000);
}
