import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IArticle } from '../interfaces/article.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private readonly articleApiUrl = `${environment.server}api/articles`;

  constructor(
    private http: HttpClient
  ) { }

  getAllArticles(): Observable<IArticle[]> {
    const url = `${this.articleApiUrl}/all`;
    return this.http.get<IArticle[]>(url);
  }

  getArticle(id: number): Observable<IArticle> {
    const url = `${this.articleApiUrl}`;
    return this.http.get<IArticle>(url, {
      params: { id: `${id}` }
    });
  }
}
