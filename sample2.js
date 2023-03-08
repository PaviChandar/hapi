import Hapi from "@hapi/hapi"

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    })

    server.route({
        method: 'POST',
        path: '/create',
        handler: function (request, h)  {
            const name = request.payload.name
            return `Hello `+name

            // const user = request.params.user ? request.params.user : 'stranger';

            // return `Hello ${user}!`;
        }
    })

    await server.start()
    console.log("Server running on port %s", server.info.uri);
    console.log("Server info %s", server.info);
}

process.on('unhandledRejection', (error) => {
    console.log("Error : ", error)
    process.exit(1)
})

init()