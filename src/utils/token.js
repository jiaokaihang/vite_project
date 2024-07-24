export const SET_TOKEN = (token) => {
    return localStorage.setItem('TOKEN', token)
}

export const GET_TOKEN = () => {
    return localStorage.getItem('TOKEN')
}