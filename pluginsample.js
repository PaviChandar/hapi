import Hapi from "@hapi/hapi"
import path from "path"
import inert from "inert"

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
    })

    await server.register([
        // {
        //     plugin: require("hapi-geo-locate"),
        //     options: {
        //         enabledByDefault: false
        //     }
        // },
        {
            plugin: inert
        }
    ]
    );

    server.route([
        {
            method: 'GET',
            path: '/hello',
            handler: function (request, h) {
                return h.file('./static/welcome.html')
            },
        },
        {
            method: 'GET',
            path: '/download',
            handler: function (request, h) {
                return h.file('./static/welcome.html', {
                    mode:'attachment',
                    filename:'welcome-download.html'
                })
            },
        },
        {
            method: 'GET',
            path: '/myplugin',
            handler: function (request, h) {
                if (request.location) {
                    return request.location
                } else {
                    return "<h1>Your location is not enabled</h1>"
                }
            }
        }

    ])


    await server.start()
    console.log("Server running on port %s", server.info.uri);
    console.log("Server info %s", server.info);
}

process.on('unhandledRejection', (error) => {
    console.log("Error : ", error)
    process.exit(1)
})

init()