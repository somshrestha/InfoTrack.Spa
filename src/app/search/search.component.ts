import { Component } from '@angular/core';
import { SearchService } from '../services/search.service';
import { SearchDto } from '../models/search-dto.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  public data: any;

  constructor(
    private readonly searchService: SearchService
  ) {}

  ngOnInit(): void {
    const dto: SearchDto = {
      url: "infotrack.co.uk",
      searchTerm: "land registry searches"
    };
    this.searchService.getSearchResult(dto).subscribe((data) => {
        this.data = data;
      }
    );
  }
}
