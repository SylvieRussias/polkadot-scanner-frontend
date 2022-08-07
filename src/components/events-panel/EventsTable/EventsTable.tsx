import "./EventsTable.scss";
import BootstrapTable from "react-bootstrap-table-next";
import { EventSummary } from "../../../polkadot-scanner/event-summary/event-summary";
import { EventArguments } from "../EventArguments/EventArguments";
import { useTranslation } from "react-i18next";

interface EventWithKey extends EventSummary {
    key?: string;
}

export function EventsTable(props: { events: EventSummary[]; filter?: string }) {
    const { t } = useTranslation();
    const filteredEvents: EventWithKey[] = props.events.filter(
        (e) => !props.filter || e.name.includes(props.filter)
    );
    filteredEvents.forEach((e) => (e.key = JSON.stringify(e)));

    const columns = [
        {
            dataField: "blockNumber",
            text: t("blockNumber"),
            sort: true,
            classes: "EventsTable-block-number",
        },
        {
            dataField: "name",
            text: t("eventName"),
            sort: true,
            classes: "EventsTable-event-name",
        },
        {
            dataField: "hash",
            text: t("eventHash"),
            sort: true,
        },
    ];

    return (
        <BootstrapTable
            keyField="key"
            data={filteredEvents}
            columns={columns}
            expandRow={{
                renderer: (row: EventSummary) => <EventArguments arguments={row.arguments} />,
            }}
            classes="table-dark EventsTable"
        />
    );
}
