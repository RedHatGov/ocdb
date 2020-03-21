import queryString from 'query-string'

export function Parse() {
    return queryString.parse(window.location.search)
}
