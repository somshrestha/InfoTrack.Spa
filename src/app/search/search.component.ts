import { Component } from '@angular/core';
import { SearchService } from '../services/search.service';
import { SearchDto } from '../models/search-dto.model';
import { SearchResultDto } from '../models/search-result-dto.model';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { urlRegex } from '../shared/regex-patterns';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  public searchResult: any;
  public searchResultHistory: any;
  public searchForm: any;
  public maxCharacter: number = 100;

  constructor(
    private readonly searchService: SearchService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      url: [null, [Validators.required, Validators.pattern(urlRegex)]],
      searchTerm: [null, [Validators.required, Validators.maxLength(this.maxCharacter)]]
    });

    this.getSearchHistory();
  }

  public get url(): AbstractControl {
    return this.searchForm.get('url');
  }

  public get searchTerm(): AbstractControl {
    return this.searchForm.get('searchTerm');
  }

  public onSearch(): void {
    const searchDto: SearchDto = {
      url: this.url.value,
      searchTerm: this.searchTerm.value
    };

    this.searchService.getSearchResult(searchDto).subscribe((data) => {
      this.searchResult = data;
      this.getSearchHistory();
    });
  }

  public getSearchHistory(): void {
    this.searchService.getAllSearchHistory().subscribe((data) => {
      this.searchResultHistory = data;
    });
  }
}
