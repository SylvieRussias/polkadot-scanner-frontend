import "./TextInput.scss";

export function TextInput(props: {
    inputProps: React.InputHTMLAttributes<HTMLInputElement>;
    isValid?: boolean;
}) {
    return (
        <input
            {...props.inputProps}
            className={props.isValid !== false ? "TextInput-valid" : "TextInput-invalid"}
        />
    );
}
