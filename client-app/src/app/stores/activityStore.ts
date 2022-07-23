import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import {v4 as uuid} from 'uuid';

export default class ActivityStore {

    activityRegistry = new Map<string, Activity>();
    selectedActivity?: Activity | null = null;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a,b) =>
            Date.parse(a.date) - Date.parse(b.date));
    }

    // action.bound החץ גורם לפונקציה להיות מקושרת לקלאס ואין צורך להצהיר עליה בבנאי כ
    loadActivities = async () => {
        try {
            console.log('why is loading executed twice?');
            const activities = await agent.Activities.list();
            if (this.activityRegistry.size === 0)
                activities.forEach(activity => {
                    activity.date = activity.date.split('T')[0];
                    runInAction(() => {
                        this.activityRegistry.set(activity.id, activity);
                    })
                })
        } catch(error) {
            console.log(error);
        }
        this.setLoadingInitial(false);
    }

    // This method is considered an Action so no need in runInAction
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    setLoading = (state: boolean) => {
        this.loading = state;
    }

    selectActivity = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);
    }
    cancelSelectActivity = () => {
        this.selectedActivity = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelSelectActivity();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createActivity = async (activity: Activity) => {
        this.setLoading(true);
        try {
            await agent.Activities.create({...activity, id: uuid()});
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
            })
        } catch (error) {
            console.log(error);
        }
        this.setLoading(false);
    }
    
    editActivity = async (activity: Activity) => {
        this.setLoading(true);
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
            })
        } catch (error) {
            console.log(error);
        }
        this.setLoading(false);
    }

    deleteActivity = async (id: string) => {
        this.setLoading(true);
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                if (this.selectedActivity?.id === id) this.cancelSelectActivity();
                this.selectedActivity = undefined;
            })
        } catch (error) {
            console.log(error);
        }
        this.setLoading(false);
    }
}