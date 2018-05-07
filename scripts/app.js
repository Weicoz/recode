function sayHello() {
    $ui.alert($l10n('HELLO_WORLD'));
}

function startserver() {
    $http.startServer({
        port: 6868,
        path: "",
        handler: function (result) {
            var url = result.url
            $clipboard.set({
                "type": "public.plain-text",
                "value": url
            })
        }
    })
}

function get_localtion() {
    $location.fetch({
        handler: function (resp) {
            var lat = resp.lat
            var lng = resp.lat
            var alt = resp.alt
            console.log(location)
        }
    })
}

module.exports = {
    sayHello: sayHello,
    startserver: startserver,
    get_localtion: get_localtion
}