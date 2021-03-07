import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class EnvironmentService {

  get isProduction(): boolean {
    return environment.production;
  }

  get apiUrl(): string {
    return environment.apiUrl;
  }

}
