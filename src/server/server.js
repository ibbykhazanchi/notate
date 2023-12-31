const url = process.env.REACT_APP_SERVER_URL

export async function addUser(botId, accessToken){
    try{
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'  
            },
            body: JSON.stringify({
                botId: botId,
                accessToken: accessToken
            })
        }
        const response =  await fetch(`${url}/addUser`, options)
        const data = await response.json()
        if(data.message === "User added to the database."){
            return true;
        }
        return false;
    } catch (error) {
        console.error(error)
        return false;
    }

}

export async function getUser(botId) {
    try {
        const response =  await fetch(`${url}/getUser/${botId}`)
        const data = await response.json()
        if(data.account){
            return data.account;
        }
        return null;
    } catch (error) {
        console.error(error)
        return null
    }
}