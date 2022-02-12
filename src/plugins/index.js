module.exports = function (fastify, opts, done) {
    fastify.decorate('utility', function () {})
    fastify.get('/api-health', function () {})
    done()
}