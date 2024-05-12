import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-history.component.html',
  styleUrls: ['../app.component.css']
})
export class SearchHistoryComponent implements OnInit {
  public searchResultHistory: any;

  private readonly subscriptions: Subscription[] = [];

  constructor(
    private readonly searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.getSearchHistory();
  }

  public getSearchHistory(): void {
    const searchHistorySubscription = this.searchService.getAllSearchHistory().subscribe((data) => {
      this.searchResultHistory = data;
    });
    this.subscriptions.push(searchHistorySubscription);
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
