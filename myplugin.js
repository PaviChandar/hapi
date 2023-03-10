const myplugin = {
  name: 'myplugin',
  version: '1.0.0',
  register: async function (server, options) {
    server.route({
      method: 'POST',
      path: '/test',
      handler: function (request, h) {
        return "My first plugin"
      }
    })
  }
}

export default myplugin