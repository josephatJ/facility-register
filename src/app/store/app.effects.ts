import { CurrentUserEffects } from "./current-user/current-user.effects";
import { OrganisationUnitsEffects } from "./organisation-units/organisation-units.effects";
import {DataSetsEffects} from './data-sets/data-sets.effects';

export const effects = [
    CurrentUserEffects,
    OrganisationUnitsEffects,
    DataSetsEffects
]
