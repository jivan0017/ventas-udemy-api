import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { authorizationToLoginPayload } from "../utils/converters/base-64-converter";

export const userId = createParamDecorator((_, ctx: ExecutionContext) => {
    const { authorization } = ctx.switchToHttp().getRequest().headers;

    const loginPayload = authorizationToLoginPayload(authorization);

    console.log(">>> authorization ", authorization);

    return loginPayload?.id;
});
