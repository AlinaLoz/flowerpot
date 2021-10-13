import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "semantic-ui-react";
import Platform from "../../helpers/Platform";
import { appDialogSet } from "../../redux/actions/appActions";
import { settingsSelector } from "../../redux/selectors/settingsSelectors";
import { s } from "../../values/Strings";

export function QuickLinksContainer() {
    const settings = useSelector(settingsSelector);
    const dispatch = useDispatch();

    const links = settings.links.sort((a, b) => (a.order || 0) - (b.order || 0));

    const openLink = (url: string) => {
        Platform.current.openUrl(url);
    };

    const addNew = () => {
        dispatch(appDialogSet("addLink", true));
    };

    const items = links.map((x) => (
        <Label color={x.color as any} onClick={() => openLink(x.url)} size="mini" basic>
            {x.name}
        </Label>
    ));

    if (!items.length) {
        items.push(<span style={{ color: "gray", fontSize: 10, fontStyle: "italic" }}>{s("noLinks")}</span>);
    }

    if (links.length < 5) {
        items.push(
            <Label onClick={addNew} size="mini">
                +
            </Label>
        );
    }

    return (
        <div className="ql-container" style={{ textAlign: "right" }}>
            {items}
        </div>
    );
}
