import Hapi from "@hapi/hapi"
import  myplugin  from "./myplugin.js"

const init = async () => {
    const server = Hapi.server({
        port: 3050,
        host: 'localhost'
    })

    await server.register({
       plugin : myplugin
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