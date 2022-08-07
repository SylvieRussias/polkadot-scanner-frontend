import "./App.scss";
import { ScannerPanel } from "./components/ScannerPanel/ScannerPanel";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import translate from "./config/translate.json";

i18n.use(initReactI18next).init(translate);

export function App() {
    const { t } = useTranslation();

    return (
        <div className="App">
            <h1 className="App-title">{t("appTitle")}</h1>
            <ScannerPanel />
        </div>
    );
}
