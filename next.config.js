const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  pwa: {
    dest: 'public',
    subdomainPrefix: "/shout",
    runtimeCaching
  },
  basePath: '/shout',
})
