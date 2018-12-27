import { AppState } from "../app.reducers";
import { createSelector } from "@ngrx/store";
import { OrganisationUnitGroupSetsState } from "./organisation-units.state";


const organisationUnitGroupSets = (state: AppState) => state.organisationUnitGroupSets;

export const getOrganisationUnitGroupSets = createSelector(organisationUnitGroupSets, (organisationUnitGroupSetsObj: OrganisationUnitGroupSetsState) => organisationUnitGroupSetsObj);
