export interface MoveDetails {
    accuracy: null;
    contest_combos: Contestcombos;
    contest_effect: Contestcombos;
    contest_type: Contestcombos;
    damage_class: Contestcombos;
    effect_chance: null;
    effect_changes: any[];
    effect_entries: Effectentry[];
    flavor_text_entries: any[];
    generation: Language;
    id: number;
    learned_by_pokemon: any[];
    machines: any[];
    meta: Contestcombos;
    name: string;
    names: any[];
    past_values: any[];
    power: null;
    pp: number;
    priority: number;
    stat_changes: any[];
    super_contest_effect: Supercontesteffect;
    target: Language;
    type: Language;
}

interface Supercontesteffect {
    url: string;
}

interface Effectentry {
    effect: string;
    language: Language;
    short_effect: string;
}

interface Language {
    name: string;
    url: string;
}

interface Contestcombos {
}