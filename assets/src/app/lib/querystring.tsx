import queryString from 'query-string'

export function Parse() {
    return queryString.parse(window.location.search)
}

export function Set(hash) {
    var qs = queryString.stringify(hash)
    if (qs != "") {
        qs = "?" + qs
    }
    history.pushState({page: 1}, "title 1", window.location.pathname + qs)
}
