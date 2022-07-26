import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";

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

    get groupedActivities() {
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = activity.date;
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;
            }, {} as {[key: string]: Activity[]})
        )
    }

    // action.bound החץ גורם לפונקציה להיות מקושרת לקלאס ואין צורך להצהיר עליה בבנאי כ
    loadActivities = async () => {
        this.setLoadingInitial(true);
        try {
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                this.setActivity(activity);
            });
        } catch(error) {
            console.log(error);
        }
        this.setLoadingInitial(false);
    }

    // action.bound החץ גורם לפונקציה להיות מקושרת לקלאס ואין צורך להצהיר עליה בבנאי כ
    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (!activity) {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
            } catch(error) {
                console.log(error);
            }
            this.setLoadingInitial(false);
        }
        runInAction(() => {
            this.selectedActivity = activity;
        })
        return activity;
    }

    private setActivity = (activity: Activity) => {
        activity.date = activity.date.split('T')[0];
        this.activityRegistry.set(activity.id, activity);
    }

    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    // This method is considered an Action so no need in runInAction
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    setLoading = (state: boolean) => {
        this.loading = state;
    }

    createActivity = async (activity: Activity) => {
        this.setLoading(true);
        try {
            await agent.Activities.create(activity);
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
            })
        } catch (error) {
            console.log(error);
        }
        this.setLoading(false);
    }
}