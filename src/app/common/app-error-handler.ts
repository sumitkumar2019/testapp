import { ErrorHandler } from '@angular/core';

export class AppErrorHandler implements ErrorHandler{
    handleError(error){
        alert('An Unexpected Error has occur');
        console.log(error);
    }
}