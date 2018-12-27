
export interface CurrentUserState {
    id: string;
    name: string;
    displayName: string;
    email: string;
    created: string;
    lastUpdated: string;
    dataViewOrganisationUnits: any[];
    userCredentials: any;
    userGroups: any;
};

export interface IdentifibleObjectState {
    id: string;
    name: string;
}
