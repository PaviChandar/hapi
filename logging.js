import Hapi from "@hapi/hapi"
import Loguser from "./model/loguser.js"
import { userValidation } from "./validation.js"
import bunyan from "bunyan"
// import routes from "./src/routes/index.js"

const init = async () => {
    const server = Hapi.server({
        port: 2000,
        host: 'localhost'
    })

    // routes(server)

    var log = bunyan.createLogger({
        name: 'userBunyan',
        serializers: bunyan.stdSerializers
    })

    server.ext('onRequest', (request, h) => {
        if(request.headers && request.headers['postman-token']){
            console.log("Request headers in onRequest method : ", request.headers['postman-token'])
        }
        return h.continue
    })

    server.ext('onPreAuth', (request,h) => {
        console.log("onPreAuth functionality")
        return h.continue
    })

    server.ext('onCredentials', (request,h) => {
        console.log("onCredentials functionality")
        return h.continue
    })

    server.ext('onPostAuth', (request, h, error) => {
        if (request.payload) {
            console.log("onPostAuth payload : ", request.payload)
        }
        return h.continue
    })

    server.ext('onPreHandler', (request,h)=> {
        console.log("onPreHandler : before entering handler function")
        return h.continue
    })

    server.ext('onPostHandler', (request,h)=> {
        console.log("onPostHandler : after finishing handler function")
        return h.continue
    })

    server.ext('onPreResponse', (request,h) => {
        console.log("req res : ", request.response.source)
        return h.continue
    })

    server.route({
        method: 'POST',
        path: '/log',
        handler: async function (request, h) {
            console.log("request payload: ", request.payload)
            const userError = userValidation(request.payload)
            try {
                if (userError) {
                    const errors = []
                    userError.error.details.forEach((details) => {
                        let error = { [details.path.toString()]: details.message }
                        errors.push(error)
                    })
                    throw errors
                } else {
                    const newUser = new Loguser({ ...request.payload })
                    await newUser.save()
                    const response = newUser
                    return response
                }
            } catch (error) {
                console.log("Error : ", error)
                const err = new Error(error)
                log.info({ err }, error)
                return error
            }
        }
    })

    await server.start()
    console.log("Server running on port %s", server.info.uri);
}

process.on('rejection', (error) => {
    console.log("Error inside handle rejection : ", error)
    process.exit(1)
})

init()
