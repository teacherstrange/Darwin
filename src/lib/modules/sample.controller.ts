import {Controller} from '../../utils/generic/controller';

import {Body, Post, Route} from "tsoa";
import {IResponse} from "../../types/response.type";
declare var global: any;

@Route('index')
export class indexController extends Controller{

    @Post("supercontroller")
    public async sample(
        @Body() body: {name : string, description? : string}
    ): Promise<IResponse> {
        const index: string = "Auth"
        console.log(index);
        return this.liteResponse(global.responseCode.SUCCESS, index);
    }
}
