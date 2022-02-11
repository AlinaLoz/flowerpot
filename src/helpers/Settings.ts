import { IQuery } from "./Query";
import Platform from "./Platform";
import { ILinkItem } from "./Links";
import { store } from "../redux/store";
import { settingsSet } from "../redux/actions/settingsActions";
import { appSet } from "../redux/actions/appActions";
import { TableScale } from "../redux/reducers/settingsReducer";
import { IProject } from "./Project";

export type TSortPattern = "default" | "assignedto" | "id";
export type TNotificationsMode = "all" | "mine" | "none";
export type TLists = "permawatch" | "favorites" | "deferred" | "hidden" | "keywords" | "pinned";

export interface IListItem {
    id: number;
    rev: number;
    word?: string;
    collection?: string;
}

interface INoteItem {
    collection: string;
    id: number;
    note: string;
    color?: string;
}

export interface ISettings {
    tfsPath: string;
    tfsUser: string;
    tfsPwd: string;
    credentialsChecked: boolean;
    refreshRate: number;
    sortPattern: TSortPattern;
    tableScale: TableScale;
    notificationsMode: TNotificationsMode;
    iconChangesOnMyWorkItemsOnly: boolean;
    mineOnTop: boolean;
    projects: IProject[];
    queries: IQuery[];
    lists: {
        [K in TLists]: IListItem[];
    };
    notes: INoteItem[];
    links: ILinkItem[];
    darkTheme: boolean;
    allowTelemetry: boolean;
    showWhatsNewOnUpdate: boolean;
    showUnreads: boolean;
    showAvatars: boolean;
    showQuickLinks: boolean;
    lastTimeVersion: string;
    lastTimeVersionLong: string;
    migrationsDone: string[];
    bannersShown: number[];
}

export default class Settings {
    public static async read() {
        const settings = await Platform.current.getStoreProp("flowerpot");
        if (settings) {
            try {
                const parsedSettings = JSON.parse(settings);
                //store.setSettings(parsedSettings);
                store.dispatch(settingsSet(parsedSettings));
            } catch (e: any) {}
        }

        const autostart = await Platform.current.getStoreProp("autostart");
        const locale = await Platform.current.getStoreProp("locale");

        store.dispatch(appSet({ autostart, locale }));
    }

    public static save(settings: ISettings) {
        try {
            const settingsToStore = JSON.stringify(settings);
            Platform.current.setStoreProp("flowerpot", settingsToStore);
        } catch (e: any) {}
    }
}
