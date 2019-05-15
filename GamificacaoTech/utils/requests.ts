const request = require("request")

export = class Request {

    public static async get(URL: string, fn: Function): Promise<string> {
        var resp: string
        request.get(URL, (error, response, body) => {
            resp = body
            return fn(body)
        })
        console.log(resp)
        return resp
             
    }
}