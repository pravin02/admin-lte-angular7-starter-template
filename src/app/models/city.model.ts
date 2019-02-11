import { State } from './state.model';

export interface City {
    cityID: number;
    name: string;
    state?: State;
}