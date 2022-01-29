function setObjectQueryParams(params) {
  return Object.keys(params)
    .map((key) => key + '=' + params[key])
    .join('&')
}

function getQueryStringParams(query) {
  return query
    ? (/^[?#]/.test(query) ? query.slice(1) : query).split('&').reduce((params, param) => {
        let [key, value] = param.split('=')
        params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : ''
        return params
      }, {})
    : {}
}
export { setObjectQueryParams, getQueryStringParams }
