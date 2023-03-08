import Hapi from "@hapi/hapi"
import Qs from "querystring"

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        query:{
            parser : (query) => Qs.parse(query)
        }
    })

    server.route({
        method: 'GET',
        // path: '/user/{newuser?}',
        path:'/',
        handler: (request, h) => {
            // const user = {
            //     firstname:"Pavithra",
            //     lastname:"Chandar",
            //     username:"pavi.chandar",
            //     id:123
            // }

            // const newuser = request.params.newuser ? request.params.newuser : 'stranger'
            // return `hello, ${newuser}`

            return request.query
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