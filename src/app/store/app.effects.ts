import { CurrentUserEffects } from "./current-user/current-user.effects";
import { OrganisationUnitsEffects } from "./organisation-units/organisation-units.effects";
import {DataSetsEffects} from './data-sets/data-sets.effects';
import {Dhis2DataStoreEffects} from './dhis2-data-store/dhis2-data-store.effects';

export const effects = [
    CurrentUserEffects,
    OrganisationUnitsEffects,
    DataSetsEffects,
    Dhis2DataStoreEffects
]
