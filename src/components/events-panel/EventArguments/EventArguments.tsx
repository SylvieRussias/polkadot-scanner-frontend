import "./EventArguments.scss";

export function EventArguments(props: { arguments: Object }) {
    const args = Object.entries(props.arguments);
    return args.length > 0 ? argumentsList(args) : noArgumentMessage();

    function argumentsList(args: [string, any][]) {
        return (
            <div className="EventArguments">
                {args.map(([key, value]) => (
                    <div key={key} className="EventArguments-argument">
                        <div className="EventArguments-argument-name">{key}</div>
                        <div className="EventArguments-argument-value">{JSON.stringify(value)}</div>
                    </div>
                ))}
            </div>
        );
    }

    function noArgumentMessage() {
        return <div className="EventArguments-no-argument">No arguments</div>;
    }
}
