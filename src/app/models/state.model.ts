import { Country } from './country.model';

export interface State {
    _id : Number;
    stateID: Number;
    name: String;
    country?: Country;
}