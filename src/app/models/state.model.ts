import { Country } from './country.model';

export interface State {   
    stateId: Number;
    stateName: String;
    stateCode? : String;    
    country?: Country;
}