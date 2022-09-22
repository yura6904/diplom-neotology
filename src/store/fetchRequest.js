export const fetchRequest = async (url, params={}) => {
    let data = []
    try {
        let response = await fetch(url, params)
        data = response.json()
    } catch (e) {
        //TODO: remake
        window.location.replace('http://localhost:3000/error-404')
    }
     
    return data
}