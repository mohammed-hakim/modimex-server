// import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
// import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql';
// @Catch(HttpException)
// export class GraphQLErrorFilter implements GqlExceptionFilter {
//   catch(exception: HttpException, host: ArgumentsHost) {
//     console.log(963);

//     const gqlHost = GqlArgumentsHost.create(host);
//     // console.log(gqlHost.getRoot(), gqlHost.getContext(), gqlHost.getInfo());
//     console.log(777);

//     console.log(exception.getResponse());

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
