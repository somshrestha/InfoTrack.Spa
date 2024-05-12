import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-history.component.html',
  styleUrls: ['../app.component.css']
})
export class SearchHistoryComponent implements OnInit {

  public searchResultHistory: any;

  constructor(
    private readonly searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.getSearchHistory();
  }

  public getSearchHistory(): void {
    this.searchService.getAllSearchHistory().subscribe((data) => {
      this.searchResultHistory = data;
    });
  }
}
