const { Client } = require('@notionhq/client')

const dotenv = require('dotenv').config()

const notion = new Client({
  auth: process.env.NOTION_AUTH,
  version: process.env.NOTION_VER,
})

const database_id = process.env.NOTION_DB_AUTHORS_ID

module.exports = async function getAuthors() {
  const payload = {
    path: `databases/${database_id}/query`,
    method: 'POST',
  }

  const {results} = await notion.request(payload)


  const authors = results.map((page) => {
    return {
      id: page.id,
      name: page.properties.Name.title[0].text.content,
      tags: page.properties.Tags.multi_select.map(tag => {
        return tag.name
      })
    }
  })

  return authors
}