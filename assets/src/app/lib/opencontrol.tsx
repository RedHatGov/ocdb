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

export function OpenControlToCSV(list: CustomControl[]) {
    var result = "NIST-800-53,Name,Description,Implementation Status,Control Response\n"
    list.map((c) => {
        const status = c.Satisfies ? c.Satisfies.implementation_status : "unknown"
        const response = c.Satisfies ?
                  (Array.isArray(c.Satisfies.narrative) ?
                   c.Satisfies.narrative.map((n) => { return n.text + '\n'}).reduce((a,b) => a+b) :
                   c.Satisfies.narrative
                  ) :
                  ""
        const line = c.Key + ","
                 + c.Control.name + ","
                 + escape(c.Control.description) + ","
                 + status + ","
                 + escape(response) + "\n"
        result += line
    })
    return result
}

function escape(field) {
    return '"' + field.replace('"', '""') + '"'
}
