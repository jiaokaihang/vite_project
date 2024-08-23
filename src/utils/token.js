export const SET_TOKEN = (token) => {
    return sessionStorage.setItem('TOKEN', token)
}

export const GET_TOKEN = () => {
    return sessionStorage.getItem('TOKEN')
}

export const DELETE_TOKEN = () => {
    return sessionStorage.removeItem('TOKEN')
}