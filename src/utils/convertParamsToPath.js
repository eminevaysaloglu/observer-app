const convertParamsToPath = (params) => {
    let url = ""
    for (let param in params) {
        const val = params[param]
        if (url === "")
            url = `${param}=${val}`
        else
            url = `${url}&${param}=${val}`
    }
    return url;
}

export default convertParamsToPath