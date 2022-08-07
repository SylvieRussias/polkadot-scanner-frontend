import "./EventsPanel.scss";
import { EventSummary } from "../../../polkadot-scanner/event-summary/event-summary";
import { EventsTable } from "../EventsTable/EventsTable";
import { TextInput } from "../../inputs/TextInput/TextInput";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function EventsPanel(props: { events: EventSummary[] }) {
    const { t } = useTranslation();
    const [filter, setFilter] = useState("");

    return (
        <div className="EventsPanel">
            <TextInput
                inputProps={{
                    onChange: (event) => setFilter(event.target.value),
                    placeholder: t("filterEventByName"),
                }}
            />
            <div className="EventsPanel-event-count">{buildEventText()}</div>
            <EventsTable events={props.events} filter={filter} />
        </div>
    );

    function buildEventText(): string {
        const eventCount = props.events.length;
        const eventLabel = eventCount > 1 ? t("events") : t("event");
        return `${eventCount} ${eventLabel}`;
    }
}
