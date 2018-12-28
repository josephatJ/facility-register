import { AppState } from "../app.reducers";
import { createSelector } from "@ngrx/store";
import {OrganisationUnitGroupSetsState, OrganisationUnitsState} from './organisation-units.state';


const organisationUnitGroupSets = (state: AppState) => state.organisationUnitGroupSets;
const organisationUnit = (state: AppState) => state.organisationUnit;

export const getOrganisationUnitGroupSets = createSelector(organisationUnitGroupSets, (organisationUnitGroupSetsObj: OrganisationUnitGroupSetsState) => organisationUnitGroupSetsObj);
export const getOrganisationUnitByID = createSelector(organisationUnit, (organisationUnitObj: OrganisationUnitsState) => organisationUnitObj);
