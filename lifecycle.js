import Hapi from "@hapi/hapi"

const init = async () => {
    const server = Hapi.server({
        port: 8000,
        host: 'localhost'
    })

    server.route({
        method: 'GET',
        path: '/lifecycle/{user?}',
        handler: function (request, h) {
            const user = request.params.user ? request.params.user : 'stranger';

            return `Hello ${user}!`;
        },
    })

    server.ext('onRequest', (request, h) => {
        const user = request.params
        console.log("User params : ", request.params)
        if(user){
            console.log("Contains params")
        }else{
            console.log("does not contain params")
        }

        return h.continue
    })

    await server.start()
    console.log("Server running in port %s", server.info.uri)
    
}

init()