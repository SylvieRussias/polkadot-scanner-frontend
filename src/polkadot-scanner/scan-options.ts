export interface ScanOptions {
    /* Blocks are numbers that may include ',' as thousand separtor */
    startBlock?: string;
    endBlock?: string;

    endpoint: string;
}

export function scannerOptionsblockToNumber(block: string): number {
    return Number.parseInt(block.replaceAll(",", "").trim());
}
