export interface PokemonResult {
    count: number;
    next: null | string;
    previous: null | string;
    results: Pokemon[];
}

export interface Pokemon {
    name: string;
    url: string;
}