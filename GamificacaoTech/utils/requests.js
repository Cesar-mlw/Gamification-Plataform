"use strict";
const request = require("request");
module.exports = class Request {
    static async get(URL, fn) {
        var resp;
        request.get(URL, (error, response, body) => {
            resp = body;
            return fn(body);
        });
        console.log(resp);
        return resp;
    }
};
//# sourceMappingURL=requests.js.map