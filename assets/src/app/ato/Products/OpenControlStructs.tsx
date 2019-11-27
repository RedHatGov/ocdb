interface Narative {
    key?: string,
    text: string
}

export interface Satisfies {
    control_key: string;
    narrative: Narative[];
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
