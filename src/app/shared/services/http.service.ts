import { EnviromentService } from './enviroment.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter, shareReplay, tap } from 'rxjs/operators';

export class HttpService<T> extends EnviromentService {
  private items$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>(null);
  private activeSubscription: Subscription;
  private readonly url: string;

  constructor(public httpClient: HttpClient, public endpoint: string) {
    super();
    this.url = `${this.apiUrl}/${this.endpoint}`;
  }

  public get items(): Observable<T[]> {
    if (this.items$.getValue() === null && !this.activeSubscription) {
      this.refreshItems();
    }
    return this.items$.asObservable().pipe(filter(items => items !== null));
  }

  public getItem(id: any): Observable<T> {
    return this.httpClient
      .get<T>(`${this.url}/${id}`)
      .pipe();
  }

  public post(value: T): Observable<T> {
    return this.httpClient
      .post<T>(`${this.url}`, value)
      .pipe();
  }

  public update(id: any, value: T): Observable<T> {
    return this.httpClient
      .put<T>(`${this.url}/${id}`, value)
      .pipe();
  }

  public deleteItem(id: any): Observable<T> {
    return this.httpClient
      .delete<T>(`${this.url}/${id}`)
      .pipe();
  }

  public refreshItems(): void {
    this.activeSubscription = this.getAll().subscribe(() => this.activeSubscription = undefined);
  }

  private getAll(): Observable<T[]> {
    return this.httpClient
      .get<T[]>(`${this.url}`)
      .pipe(
        shareReplay(),
        tap(items => this.items$.next(items))
      );
  }

}
