import "./ScanOptionsPanel.scss";
import { useState } from "react";
import { ScanOptionsForm } from "../ScanOptionsForm/ScanOptionsForm";
import { ScanOptions, scannerOptionsblockToNumber } from "../../../polkadot-scanner/scan-options";
import { useTranslation } from "react-i18next";

export function ScanOptionsPanel(props: {
    scanOptions: ScanOptions;
    onScan: (scanOptions: ScanOptions) => any;
}) {
    const { t } = useTranslation();
    const [formErrorMessage, setFormErrorMessage] = useState("");

    return (
        <>
            <ScanOptionsForm value={props.scanOptions} onSubmit={(options) => onSubmit(options)} />
            <div className="ScanOptionsPanel-error">{formErrorMessage}</div>
        </>
    );

    function onSubmit(options: ScanOptions): void {
        if (
            scannerOptionsblockToNumber(options.startBlock!) >
            scannerOptionsblockToNumber(options.endBlock!)
        ) {
            setFormErrorMessage(t("startBlockAfterEndBlockError"));
        } else {
            setFormErrorMessage("");
            props.onScan(options);
        }
    }
}
