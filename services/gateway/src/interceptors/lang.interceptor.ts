import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  Logger,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Context, GqlExecutionContext } from '@nestjs/graphql';
import { MyContext } from 'users/types';
@Injectable()
export class LangInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest();

    let lang = (context as any).getNext()?.req?.headers?.lang;

    // console.log({
    //   context,

    //   req: context.getNext().req,
    //   res: context.getNext().res,
    // });
    if (req) {
      
      return next.handle().pipe(
        tap((data) => {
          {
            if (data?.errors?.length) {
              data.errors.forEach((h, i) => {
                if (h.en) {
                  data.errors[i] = data.errors[i][lang];
                }
              });
            }
            if (data?.success) {
              data.success = data.success[lang];
            }
          }
        }),
      );
    } else if (!req) {
      
      return next.handle().pipe(
        tap((data) => {
          {
            console.log('interceptor lang',{data});
            
            if (data?.errors?.length) {
              data.errors.forEach((h, i) => {
                if (h.en) {
                  data.errors[i] = data.errors[i][lang];
                }
              });
            }
            if (data?.success) {
              data.success = data.success[lang];
            }
          }
        }),
      );
    }
    //.pipe(map((data) => ({ data })));
    // if (req) {
    //   const method = req.method;
    //   const url = req.url;

    //   return next
    //     .handle()
    //     .pipe(
    //       tap(() =>
    //         Logger.log(
    //           `${method} ${url} ${Date.now() - now}ms`,
    //           context.getClass().name,
    //         ),
    //       ),
    //     );
    // } else {
    //   const ctx: any = GqlExecutionContext.create(context);
    //   const resolverName = ctx.constructorRef.name;
    //   const info = ctx.getInfo();

    //   return next
    //     .handle()
    //     .pipe(
    //       tap(() =>
    //         Logger.log(
    //           `${info.parentType} "${info.fieldName}" ${Date.now() - now}ms`,
    //           resolverName,
    //         ),
    //       ),
    //     );
    // }
  }
}
