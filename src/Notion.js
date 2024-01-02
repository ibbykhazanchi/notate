import { Client } from "@notionhq/client";

let notion = null;

const getClient = async () => {
  if (!notion) {
    const response = await chrome.storage.session.get(["accessToken"]);
    const accessToken = response.accessToken;
    if (accessToken) {
      notion = new Client({ auth: accessToken });
    }
  }
  return notion;
};

export const getFolders = async () => {
  try {
    const notion = await getClient();
    if (!notion) return;

    const response = await notion.search({
      filter: {
        value: "page",
        property: "object",
      },
      sort: {
        direction: "descending",
        timestamp: "last_edited_time",
      },
    });
    const pageObjects = [];
    for (const pageObj of response.results) {
      if (pageObj.properties.title && pageObj.properties.title.title[0]) {
        pageObjects.push({
          id: pageObj.id,
          title: pageObj.properties.title.title[0].plain_text,
        });
      }
    }
    return pageObjects;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const createNotionPage = async (title, parentId) => {
  try {
    const notion = getClient();
    if (!notion) return;
    const response = await notion.pages.create({
      parent: {
        type: "page_id",
        page_id: parentId,
      },
      properties: {
        title: {
          type: "title",
          title: [
            {
              type: "text",
              text: {
                content: title,
              },
            },
          ],
        },
      },
    });
    return response.id;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const sendSnippetsToNotion = async (snippets, id) => {
  if (!snippets || snippets.length === 0) {
    return;
  }
  // map the snippet array to a list of blocks
  const blocks = mapSnippetsToBlocks(snippets);

  // variable that will hold the parent page
  let parentPageId = id;

  const notion = await getClient();
  if (!notion) return;

  // send to notion
  const response = await notion.blocks.children.append({
    block_id: parentPageId,
    children: blocks,
  });

  if (response.object.error) {
    console.error(response.object.error);
    return false;
  } else {
    return true;
  }
};

const mapSnippetsToBlocks = (snippets) => {
  const blocks = snippets.map((snippet) => {
    return {
      object: "block",
      type: "bulleted_list_item",
      bulleted_list_item: {
        rich_text: [
          {
            type: "text",
            text: {
              content: snippet,
            },
          },
        ],
      },
    };
  });
  return blocks;
};
