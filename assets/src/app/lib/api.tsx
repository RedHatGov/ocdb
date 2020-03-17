function memoize(method) {
    let cache = {};
    return async function(...argum) {
        let args = JSON.stringify(argum);
        cache[args] = cache[args] || method.apply(undefined, argum);
        return cache[args];
    };
}

export var components = memoize(async function components() {
    return fetch('/api/v1/components').then(response => response.json()).then(addExtraProducts)
});

const extraProducts = [
    {key: 'rhel-8', name: 'Red Hat Enterprise Linux 8'},
    {key: 'rhel-7', name: 'Red Hat Enterprise Linux 7'},
];

function addExtraProducts(products) {
    return new Promise(
        function(resolve, reject) {
            resolve(extraProducts.concat(products).sort(
                function(a, b){
                    return a['name'] < b['name'] ? -1 : 1
                }))
        }
    )
}

export var componentControls = memoize(async function(componentId: string) {
    if (componentId == 'rhel-8') {
        return new Promise(function(resolve, reject) {
            resolve({'errors': [], 'controls': [], 'name': 'Red Hat Enterprise Linux 8'})
        })
    }
    if (componentId == 'rhel-7') {
        return new Promise(function(resolve, reject) {
            resolve({'errors': [], 'controls': [], 'name': 'Red Hat Enterprise Linux 7'})
        })
    }
    return fetch('/api/v1/components/' + componentId + '/controls')
        .then(response => response.json())
        .then((data) => {
            const nist80053 = data['controls']['NIST-800-53'];
            data['controls'] = Array.prototype.concat.apply([], Object.keys(nist80053).map(function(k, _) { return nist80053[k]; }));
            return data
        })
});

export var certifications = memoize(async function() {
    return fetch('/api/v1/certifications')
        .then(response => response.json())
        .then(data => {
            return Array.prototype.concat.apply([], Object.keys(data).map(function(k, _) {
                return {Key: k,
                        Controls: data[k].Controls['NIST-800-53']}
            }))
        })
})
