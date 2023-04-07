import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.REACT_APP_NOTION_KEY });

export const sendToNotion = async snippets => {
    if(!snippets || snippets.length === 0){
        return
    }
    
    // map the snippet array to a list of blocks
    const blocks = mapSnippetsToBlocks(snippets)
    console.log(blocks)

    // send to notion
    const blockId = '5713e479-4eaf-4e69-92b1-704feb1593a7'
    const response = await notion.blocks.children.append({
        block_id: blockId,
        children: blocks
    })

    console.log(response)

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