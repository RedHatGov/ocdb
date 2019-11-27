interface Narrative {
    key?: string,
    text: string
}

export interface Satisfies {
    control_key: string;
    narrative: Narrative[];
}

interface Control {
    name: string,
    description: string,
}

export interface CustomControl {
    Key: string,
    Control: Control,
    Satisfies: Satisfies,
}
