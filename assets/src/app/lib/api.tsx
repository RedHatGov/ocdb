export async function components() {
    return fetch('/api/v1/components').then(response => response.json())
}
