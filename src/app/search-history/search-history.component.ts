import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { SearchResultDto } from '../models/search-result-dto.model';

@Component({
  selector: 'app-search-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-history.component.html',
  styleUrls: ['../app.component.css']
})
export class SearchHistoryComponent implements OnInit {
  public searchResultHistory: SearchResultDto[] = [];
  public isFilterByDate: boolean = false;

  private readonly subscriptions: Subscription[] = [];

  constructor(
    private readonly searchService: SearchService
  ) {}

  public ngOnInit(): void {
    this.getSearchHistory();
  }

  public getSearchHistory(): void {
    const searchHistorySubscription = this.searchService.getAllSearchHistory().subscribe((data) => {
      this.searchResultHistory = data;
      if (this.isFilterByDate) {
        this.getFilteredData();
      }
      this.isFilterByDate = false;
    });
    this.subscriptions.push(searchHistorySubscription);
  }

  public filterByDate(): void {
    this.isFilterByDate = true;
    this.getSearchHistory();
  }

  public resetData(): void {
    this.isFilterByDate = false;
    this.getSearchHistory();
  }

  private getFilteredData(): void {
    var datePickerInput = document.getElementById("datepicker") as HTMLInputElement;
    var selectedDate = datePickerInput.value;
    if (selectedDate !== "") {
      var x = this.searchResultHistory.filter(srh => new Date(srh.searchDate).toISOString().split('T')[0] === selectedDate);
      this.searchResultHistory = [...new Set(x)];
    }
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
