import "./ScanOptionsForm.scss";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import { InputWrapper } from "../../inputs/InputWrapper/InputWrapper";
import { TextInput } from "../../inputs/TextInput/TextInput";
import { ScanOptions } from "../../../polkadot-scanner/scan-options";
import { useTranslation } from "react-i18next";

export function ScanOptionsForm(props: {
    value: ScanOptions;
    onSubmit: (newScanOptions: ScanOptions) => any;
}) {
    const { t } = useTranslation();
    const { register, handleSubmit, formState } = useForm<ScanOptions>({
        defaultValues: props.value,
    });

    const blockInputOptions = {
        required: t("emptyBlockInputError"),
        pattern: {
            value: /^ *[0-9,]* *$/i,
            message: t("invalidBlockInputError"),
        },
    };

    const endpointInputOptions = {
        required: t("emptyEndpointInputError"),
        pattern: {
            value: /^wss:\/\//i,
            message: t("invalidEndpointInputError"),
        },
    };

    return (
        <form onSubmit={handleSubmit(props.onSubmit)} className="ScanOptionsForm">
            <div className="ScanOptionsForm-fields">
                {buildInput(t("startBlock"), register("startBlock", blockInputOptions))}
                {buildInput(t("endBlock"), register("endBlock", blockInputOptions))}
                {buildInput(t("endpoint"), register("endpoint", endpointInputOptions))}
            </div>
            <button className="ScanOptionsForm-submit" type="submit">
                {t("startScan")}
            </button>
        </form>
    );

    function buildInput(name: string, formProps: UseFormRegisterReturn<keyof ScanOptions>) {
        const key = formProps.name;
        const error = formState.errors[key];
        const inputProps: React.InputHTMLAttributes<HTMLInputElement> = formProps;
        const defaultValue = props.value[key];
        inputProps.placeholder = `${t("ex:")} ${defaultValue}`;
        return (
            <InputWrapper label={name} errorMessage={error?.message}>
                <TextInput inputProps={inputProps} isValid={!error} />
            </InputWrapper>
        );
    }
}
