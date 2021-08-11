'use strict';

import responseParser from './response.builder';

export class Controller {
    /**
     * @param code
     * @param data
     * @param message
     * @param token
     * @returns
     */
    liteResponse(code:number, data:any = null, message:string = '', token:string = '') {

        let builder = new responseParser(code, message);
        builder.setData(data);
        builder.setToken(token);
        return builder.reply();
    }


    getExceptionStack(e:any) {
        return e.stack.split("\n")
    }

    // @TODO Complete this function
    async sendMail(to:any|string, subject:string, message:string = '', template:any = null) {
        //
    }
}