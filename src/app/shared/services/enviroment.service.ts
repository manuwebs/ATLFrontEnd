import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class EnviromentService {

  get isProduction(): boolean {
    return environment.production;
  } 
  
  get apiUrl(): string {
    return environment.apiUrl;
  }

}
