const getAuthors = require('./services/notion')

;(async () => {
  const nAuthors = await getAuthors()
  console.log(nAuthors)
})()
