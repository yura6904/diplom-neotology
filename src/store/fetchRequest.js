export const fetchRequest = async (url, params={}) => {
    let data = []
    let error = ''
    try {
        let response = await fetch(url, params)
        data = response.json()
    } catch (e) {
        error = e
        let reload = window.confirm('Что-то пошло не так, перезагурзить страницу?')
        reload ? window.location.reload() : window.location.replace('http://localhost:3000/')
    }
     
    return data
}