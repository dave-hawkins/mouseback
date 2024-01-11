const { Client } = require("@notionhq/client")

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ message: `${req.method} requests are not allowed` })
  }
  try {
    const { email } = JSON.parse(req.body)
    await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID,
      },
      properties: {
        Email: {
          email: email,
        },
      },
    })
    res.status(200).json({ msg: "Success" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: "There was an error" })
  }
}
