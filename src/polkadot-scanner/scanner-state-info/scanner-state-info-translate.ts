import { ScannerStateInfo } from "./scanner-state-info";
import { ScannerState } from "./scanner-state";
import i18n from "i18next";

export function scannerStateInfoTranslate(stateInfo: ScannerStateInfo): string | undefined {
    if (stateInfo.state === ScannerState.ERROR) {
        return stateInfo.errorMessage;
    } else {
        return i18n.t(`ScannerState.${stateInfo.state}`);
    }
}
