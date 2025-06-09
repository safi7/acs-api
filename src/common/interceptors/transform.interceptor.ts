import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  /**
   * @description modify each response in a trivial way to demonstrate the process.
   * @param context
   * @param next
   * @returns
   */
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => instanceToPlain(data)));
  }
}
