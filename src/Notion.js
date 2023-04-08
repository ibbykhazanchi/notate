import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.REACT_APP_NOTION_KEY });

const createNotionPage = async title => {
  console.log(title)
  
  try {
    const response = await notion.pages.create({
      parent: {
        type: 'page_id',
        page_id: '12b4379e-521e-41df-8e7e-83429a22c0a7',
      },
      properties: {
        title: {
          type: 'title',
          title: [
            {
              type: 'text',
              text: {
                content: title
              }
            },
          ],
        },
      },
    });
    console.log(response)
    
    return response.id

  } catch(error){
    console.error(error)
    return null
  }
}

export const sendSnippetsToNotion = async (snippets, title) => {

  // make a new page
  const blockId = await createNotionPage(title)
  if(!blockId){
    return
  }
  console.log("BLCOK ID" + blockId)

  if(!snippets || snippets.length === 0){
      return
  }
  
  // map the snippet array to a list of blocks
  const blocks = mapSnippetsToBlocks(snippets)

  // send to notion
  const response = await notion.blocks.children.append({
      block_id: blockId,
      children: blocks
  })

  if(response.object.error){
    console.error(response.object.error)
    return false
  } else {
    return true
  }
}

const mapSnippetsToBlocks = snippets => {
  const blocks = snippets.map(snippet => {
      return {
          object: 'block',
          type: 'bulleted_list_item',
          bulleted_list_item: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: snippet,
                },
              },
            ],
          },
      }
  })
  return blocks
}