import { Catch, ArgumentsHost, HttpException, Res } from '@nestjs/common';
import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql';
@Catch(HttpException)
export class GraphQLErrorFilter implements GqlExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {




    let lang = host.switchToHttp().getNext()?.req?.headers?.lang;
    let data:any = exception.getResponse() 
console.log({data});

if(data.statusCode == 404){
   let ctx = host.switchToHttp();
    let response = ctx.getResponse();
    let request = ctx.getRequest();
    response
    .status(404)
    .json({
      statusCode: 404,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  return //'<h3>Not Found Page</h3>'
}

     data &&  data.forEach((h, i) => {
        if (h.en) {
          data[i] = data[i][lang];
        }
      });
    
   return { errors: exception.getResponse() };
  }
}
