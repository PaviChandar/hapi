import Hapi from "@hapi/hapi"
import Loguser from "../../model/loguser.js"
import { userValidation } from "../../validation.js"
import bunyan from "bunyan"

const server = Hapi.server()

const routes = () => {
    var log = bunyan.createLogger({
        name: 'userBunyan',
        serializers: bunyan.stdSerializers
    })
    server.route({
        method: 'POST',
        path: '/log',
        handler: async function (request, h) {
            console.log("user Request : ", request.payload)
            const userError = userValidation(request.payload)
            console.log("schema error : ", userValidation)
            try {
                if (userError) {
                    console.log("inside if")
                    const errors = []
                    userError.error.details.forEach((details) => {
                        let error = { [details.path.toString()]: details.message }
                        errors.push(error)
                    })
                    throw errors
                } else {
                    console.log("inside else")
                    const newUser = new Loguser({ ...request.payload })
                    await newUser.save()
                    return newUser
                }
            } catch (error) {
                console.log("inside catch")
                console.log("Error : ", error)
                const err = new Error(error)
                log.info({ err }, error)
                return error
            }

        }
    })
}

export default routes