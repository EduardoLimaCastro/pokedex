export interface PokemonEvolutions {
    name: string;
    evolutiondetails: Evolutiondetails4;
}

export interface Evolutiondetails4 {
    evolution_details: Evolutiondetail[];
    evolves_to: (Evolvesto2 | Evolvesto22)[];
    is_baby: boolean;
}

export interface Evolvesto22 {
    name: string;
    evolutiondetails: Evolutiondetails3;
}

export interface Evolutiondetails3 {
    evolution_details: Evolutiondetail[];
    evolves_to: any[];
    is_baby: boolean;
}

export interface Evolvesto2 {
    name: string;
    evolutiondetails: Evolutiondetails2;
}

export interface Evolutiondetails2 {
    evolution_details: Evolutiondetail[];
    evolves_to: Evolvesto[];
    is_baby: boolean;
}

export interface Evolvesto {
    name: string;
    evolutiondetails: Evolutiondetails;
}

export interface Evolutiondetails {
    evolution_details: Evolutiondetail[];
    evolves_to: any[];
}

export interface Evolutiondetail {
    gender: null;
    held_item: null;
    item: null;
    known_move: null;
    known_move_type: null;
    location: null;
    min_affection: null;
    min_beauty: null;
    min_happiness: null;
    min_level: number;
    needs_overworld_rain: boolean;
    party_species: null;
    party_type: null;
    relative_physical_stats: null;
    time_of_day: string;
    trade_species: null;
    trigger: Trigger;
    turn_upside_down: boolean;
}

export interface Trigger {
    name: string;
    url: string;
}