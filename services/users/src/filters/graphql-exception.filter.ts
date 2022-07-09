// import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
// import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql';
// @Catch(HttpException)
// export class GraphQLErrorFilter implements GqlExceptionFilter {
//   catch(exception: HttpException, host: ArgumentsHost) {
//     const gqlHost = GqlArgumentsHost.create(host);
//     // console.log(gqlHost.getRoot(), gqlHost.getContext(), gqlHost.getInfo());
//     console.log(exception.getResponse(), 8787);
//     return { errors: exception.getResponse() };
//   }
// }


import { Catch, ArgumentsHost, HttpException  , ExceptionFilter } from '@nestjs/common';
@Catch(HttpException)
export class GraphQLErrorFilter implements ExceptionFilter  {
  catch(exception: HttpException, host: ArgumentsHost) {
    return { errors: exception.getResponse() };
  }
}
