export async function getAllRecords(){
    try {
        const response = await fetch('http://localhost:3000/getAllData')

        if(response.status === 404){
            return null
        }

        return await response.json()
    } catch (e) {
        console.error(e)
    }
}