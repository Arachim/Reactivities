import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
    activities: Activity[];
    selected: Activity | undefined;
    select: (id: string) => void;
    cancelSelect: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    delete_: (id: string) => void;
}

export default function ActivityDashboard({activities, selected,
        select, cancelSelect, editMode, openForm, closeForm, createOrEdit, delete_} : Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities} selectActivity={select} delete_={delete_} />
            </Grid.Column>
            <Grid.Column width='6'>
                {selected && !editMode &&
                <ActivityDetails
                    activity={selected}
                    cancelSelectActivity={cancelSelect}
                    openForm={openForm} />}
                    {editMode &&
                <ActivityForm closeForm={closeForm} activity={selected} createOrEdit={createOrEdit} />}
            </Grid.Column>
        </Grid>
    )
}