import React from "react";
import { Header, Label, Table, Icon } from "semantic-ui-react";
import store from "../store";
import Query, { IQuery } from "../helpers/Query";
import { observer } from "mobx-react";
import WorkItemRow from "./WorkItemRow";
import { IWorkItem } from "../helpers/WorkItem";
import Loaders from "../helpers/Loaders";

interface IProps {
    query: IQuery;
}
interface IState {
    workItems: IWorkItem[];
    isLoading: boolean;
}

@observer
export default class WorkItemsBlock extends React.Component<IProps, IState> {
    state: IState = { workItems: [], isLoading: true };

    // private onRoutinesRestart = reaction(() => store._routinesRestart, () => this.routineStart());

    componentWillUnmount() {
        store.clearInterval(this.props.query);
    }

    async componentDidMount() {
        setTimeout(async () => {
            this.routineStart();
        }, 100);
    }

    async routineStart() {
        this.setState({ workItems: [], isLoading: true });

        store.clearInterval(this.props.query);

        await this.loadWorkItemsForThisQuery();

        store.setInterval(
            this.props.query,
            setInterval(() => {
                this.loadWorkItemsForThisQuery();
            }, store.settings.refreshRate * 1000)
        );
    }

    async loadWorkItemsForThisQuery() {
        console.log("updating query", this.props.query.queryId);
        let wis = await Loaders.loadQueryWorkItems(this.props.query);
        Query.calculateIconLevel(this.props.query, wis);
        this.setState({ workItems: wis, isLoading: false });
    }

    get totalItems() {
        return this.state.workItems.length;
    }

    get redItems() {
        return this.state.workItems.filter(wi => wi.promptness === 1 || wi.rank === 1).length;
    }

    get orangeItems() {
        return this.state.workItems.filter(wi => wi.promptness === 2).length;
    }

    wiSorting = (a: IWorkItem, b: IWorkItem) => {
        if (a.weight < b.weight) return -1;
        else if (a.weight > b.weight) return 1;

        if (a.createdDate < b.createdDate) return -1;
        else return 1;
    };

    onCollapseClick = () => {
        Query.toggleCollapse(this.props.query);
    };

    render() {
        let query = this.props.query;
        let workItems = this.state.workItems.sort(this.wiSorting).map(wi => <WorkItemRow key={wi.id} item={wi} />);

        let iconCollapse = query.collapsed ? <Icon name="angle right" /> : <Icon name="angle down" />;

        return (
            <>
                <Header as="h3" dividing>
                    {!this.state.isLoading && !!this.state.workItems.length && <span onClick={this.onCollapseClick}>{iconCollapse}</span>}
                    {query.queryName}
                    <small>
                        <span style={{ marginLeft: 10, color: "gray" }}>{query.teamName}</span>
                    </small>
                    {!!this.redItems && (
                        <Label size="small" circular color="red">
                            {this.redItems}
                        </Label>
                    )}
                    {!!this.orangeItems && (
                        <Label size="small" circular color="orange">
                            {this.orangeItems}
                        </Label>
                    )}
                    {!!this.totalItems && (
                        <Label size="small" circular>
                            {this.totalItems}
                        </Label>
                    )}
                    {!this.totalItems && !this.state.isLoading && (
                        <Label size="small" circular color="green">
                            ✔
                        </Label>
                    )}
                    {this.state.isLoading && <Label size="small">Loading...</Label>}
                </Header>
                {!!this.state.workItems.length && !query.collapsed && (
                    <Table compact size="small">
                        <tbody>{workItems}</tbody>
                    </Table>
                )}
            </>
        );
    }
}