interface Narrative {
    key?: string,
    text: string
}

export interface Satisfies {
    control_key: string;
    narrative: Narrative[];
    implementation_status: string;
}

interface Control {
    name: string,
    description: string,
}

export interface CustomControl {
    Key: string,
    Control: Control,
    Satisfies?: Satisfies,
}

export interface Certification {
    Key: string,
    Controls: string[]
}
