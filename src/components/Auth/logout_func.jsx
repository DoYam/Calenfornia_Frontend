const logout = () => {
    localStorage.clear()
    window.location.replace('http://3.34.177.118:3000/')
}

export default logout;