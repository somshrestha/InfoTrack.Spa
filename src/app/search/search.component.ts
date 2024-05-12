import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { SearchDto } from '../models/search-dto.model';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { urlRegex } from '../shared/regex-patterns';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['../app.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  public searchResult: any;
  public searchForm: any;
  public maxCharacter: number = 100;

  private readonly subscriptions: Subscription[] = [];

  constructor(
    private readonly searchService: SearchService,
    private readonly formBuilder: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      url: [null, [Validators.required, Validators.pattern(urlRegex)]],
      searchTerm: [null, [Validators.required, Validators.maxLength(this.maxCharacter)]]
    });
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

    const searchResultSubscription = this.searchService.getSearchResult(searchDto).subscribe((data) => {
      this.searchResult = data;
    });

    this.subscriptions.push(searchResultSubscription);
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
