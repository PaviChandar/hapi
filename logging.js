import Hapi from "@hapi/hapi"
// import Loguser from "./model/loguser.js"
// import { userValidation } from "./validation.js"
// import bunyan from "bunyan"
import routes from "./src/routes/index.js"

const init = async () => {
    const server = Hapi.server({
        port: 2000,
        host: 'localhost'
    })

    routes(server)

    await server.start()
    console.log("Server running on port %s", server.info.uri);
}

process.on('rejection', (error) => {
    console.log("Error inside handle rejection : ", error)
    process.exit(1)
})

init()
