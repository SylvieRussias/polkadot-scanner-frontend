import "./ScannerPanel.scss";
import { ProgressBar } from "../progress/ProgressBar/ProgressBar";
import { PolkadotScanner } from "../../polkadot-scanner/polkadot-scanner";
import { EventsPanel } from "../events-panel/EventsPanel/EventsPanel";
import { ScanOptionsPanel } from "../scan-options/ScanOptionsPanel/ScanOptionsPanel";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { scannerStateInfoTranslate } from "../../polkadot-scanner/scanner-state-info/scanner-state-info-translate";

export function ScannerPanel() {
    const [scanner] = useState(initScanner());

    const ScannerPanelObserver = observer(() => (
        <div className="ScannerPanel">
            {scanner.hasLoadedLastBlock && (
                <div className="ScannerPanel-scan-options-form">
                    <ScanOptionsPanel
                        scanOptions={scanner.scanOptions}
                        onScan={(options) => scanner.scanEvents(options)}
                    />
                </div>
            )}
            <div className="ScannerPanel-results">
                <ProgressBar
                    progressRatio={scanner.loadedEvents.progressRatio}
                    text={scannerStateInfoTranslate(scanner.stateInfo)}
                />
                <EventsPanel events={scanner.loadedEvents.data} />
            </div>
        </div>
    ));
    return <ScannerPanelObserver />;

    function initScanner() {
        const scanner = new PolkadotScanner();
        scanner.loadApiAndLastBlock();
        return scanner;
    }
}
