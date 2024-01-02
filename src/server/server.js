const url = process.env.REACT_APP_SERVER_URL;

export async function addUser(botId, accessToken, profile) {
  try {
    if (!botId || !accessToken || !profile) return false;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        botId: botId,
        accessToken: accessToken,
        profile: profile,
      }),
    };
    const response = await fetch(`${url}/addUser`, options);
    const data = await response.json();
    if (data.message === "User added to the database.") {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getUser(botId) {
  try {
    const response = await fetch(`${url}/getUser/${botId}`);
    const data = await response.json();
    if (data.account) {
      return data.account;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function authenticateWithNotion(code) {
  try {
    const options = {
        method: "POST",
    };

    const response = await fetch(`${url}/authenticateWithNotion/${code}`, options);
    const json = await response.json();
    if (json.success) {
      return json.data;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
