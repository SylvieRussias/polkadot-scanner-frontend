import "./InputWrapper.scss";

export function InputWrapper(props: {
    label: string;
    errorMessage: string | undefined;
    children: React.ReactNode;
}) {
    return (
        <div className="InputWrapper">
            <label className="InputWrapper-label">{props.label}</label>
            {props.children}
            {props.errorMessage && (
                <div className="InputWrapper-error-message">{props.errorMessage}</div>
            )}
        </div>
    );
}
