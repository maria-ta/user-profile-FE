import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ArticlesService } from '../../../root/services/articles.service';
import { IArticle } from '../../../root/interfaces/article.interface';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { GeneratorService } from '../../../root/services/generator.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit, OnDestroy {
  articles: IArticle[];

  displayedColumns: string[] = ['id', 'title', 'text', 'tags', 'read'];

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private articlesService: ArticlesService,
    private generatorService: GeneratorService
  ) { }

  ngOnInit(): void {
    this.refreshArticles();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  readAnArticle(id: number): void {
    this.articlesService.getArticle(id)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((article) => {
        console.log('Read', article);
      });
  }

  generateArticle(): void {
    this.generatorService.generateArticle()
      .subscribe(() => {
        this.refreshArticles();
      });
  }

  private refreshArticles(): void {
    this.articlesService.getAllArticles()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((articles) => {
        this.articles = articles;
      });
  }

}
