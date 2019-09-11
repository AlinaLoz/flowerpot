import React from "react";
import { observer } from "mobx-react";
import { Header, Container, Button, Icon, Label } from "semantic-ui-react";
import { s } from "../values/Strings";
import store from "../store";
import ListBlock from "../components/ListBlock";

interface iProps {}
interface iState {}

@observer
export default class ListsView extends React.Component<iProps, iState> {
    onSave = () => {
        store.switchView("settings");
    };

    render() {
        return (
            <div className="Page">
                <div className="TopBar">
                    <Header as="h1">{s("listsHeader")}</Header>
                    <div className="RightTopCorner">
                        <Button positive onClick={this.onSave}>
                            {s("save")}
                        </Button>
                    </div>
                </div>
                <Container fluid>
                    <Label color="orange">
                        <span>{s("note")}</span>
                    </Label>{" "}
                    {s("listsNote")}
                    <Header as="h3" dividing>
                        <span>
                            <Icon name="eye" />
                        </span>
                        {s("permawatch")}
                    </Header>
                    {s("permawatchDescription")}
                    <ListBlock listName="permawatch" />
                    <Header as="h3" dividing>
                        <span>
                            <Icon name="star" />
                        </span>
                        {s("favorites")}
                    </Header>
                    {s("favoritesDescription")}
                    <ListBlock listName="favorites" />
                    <Header as="h3" dividing>
                        <span>
                            <Icon name="clock outline" />
                        </span>
                        {s("deferred")}
                    </Header>
                    {s("deferredDescription")}
                    <ListBlock listName="deferred" />
                    <Header as="h3" dividing>
                        <span>
                            <Icon name="eye slash outline" />
                        </span>
                        {s("hidden")}
                    </Header>
                    {s("hiddenDescription")}
                    <ListBlock listName="hidden" />
                </Container>
            </div>
        );
    }
}