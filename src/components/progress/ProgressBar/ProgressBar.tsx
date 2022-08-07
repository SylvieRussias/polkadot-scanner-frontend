import "./ProgressBar.scss";
import LinearProgress from "@mui/material/LinearProgress";

export function ProgressBar(props: { progressRatio?: number; text?: string }) {
    return (
        <div className="ProgressBar">
            <div className="ProgressBar-text">{props.text}</div>
            {props.progressRatio !== undefined && (
                <LinearProgress variant="determinate" value={props.progressRatio * 100} />
            )}
        </div>
    );
}
