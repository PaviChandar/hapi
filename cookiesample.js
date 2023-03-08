import Hapi from "@hapi/hapi"

const init = async () => {
    const server = new Hapi.server({
        host: 'localhost',
        port: 8000
    })

    server.state('session', {
        ttl: 1000 * 60 * 60 * 24,
        encoding: 'base64json'
    })

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, h) {
            console.log('req',request.info.http)
            let cookie = request.state.session
            console.log("cookie name : ", cookie)

            if (!cookie) {
                cookie = { username: "Pavithra", firstVisit: false }
            }

            cookie.lastVisit = Date.now()

            return h.response('Hello first cookie').state('session', cookie)
        }
    })

    // server.state('user', {
    //     ttl: 24 * 60 * 60 * 1000,
    //     isSecure: true,
    //     isHttpOnly: true,
    //     encoding: 'base64json',
    //     clearInvalid: false,
    //     strictHeader: true
    // });
    // server.route(
    //     {
    //     method: 'POST',
    //     path: '/',
    //     handler: function (request, h) {
    //         var data = request.payload;
    //         console.log('data',data)

    //         if (data.account === "pavi" && data.password === "pavi@2000") {
    //             console.log('dc', data.account)
    //             h.state('users', { account: "pavithra" });
    //             console.log('restate',request.state)

    //             console.log(request.state.users); //undefined

    //             return h.response('success');
    //         } else {
    //             return "wrong";
    //         }

    //     }
    // },
    // {        method: 'GET',
    //     path: '/',
    //     handler: function (request, h) {
    //         console.log('request',request)
    //         let cookie = request.state.session
    //         console.log("cOOKIE NAME : ", cookie)

    //         if (!cookie) {
    //             cookie = { username: "Pavithra", firstVisit: false }
    //         }

    //         cookie.lastVisit = Date.now()

    //         return h.response('Hello first cookie').state('session', cookie)
    // }}
    // );

    await server.start()

    console.log("Server is running on port %s", server.info.uri)

    process.on('rejection', error => {
        console.log("Error : ", error)
        process.exit(1)
    })
}

init()