export async function components() {
    return fetch('/api/v1/components').then(response => response.json())
};

export async function componentControls(componentId: string) {
    return fetch('/api/v1/components/' + componentId + '/controls')
        .then(response => response.json())
};
