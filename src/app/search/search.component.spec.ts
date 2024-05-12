import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SearchComponent } from './search.component';
import { SearchResultDto } from '../models/search-result-dto.model';
import { of } from 'rxjs';
import { SearchService } from '../services/search.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

const mockSearchResult: SearchResultDto = {
  url: 'Test',
  searchTerm: 'Search Test',
  ranking: '1, 2, 6',
  searchDate: new Date()
};

const mockForm = new FormGroup({
  url: new FormControl(null),
  searchTerm: new FormControl(null)
});

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockSearchService, mockFormBuilder;

  beforeEach(async () => {
    mockSearchService = jasmine.createSpyObj(['getSearchResult']);
    mockSearchService.getSearchResult.and.returnValue(of(mockSearchResult));

    mockFormBuilder = jasmine.createSpyObj(['group', 'patchValue']);
    mockFormBuilder.group.and.returnValue(mockForm);
    mockFormBuilder.patchValue.and.returnValue(mockForm.patchValue);

    await TestBed.configureTestingModule({
      imports: [
        SearchComponent,
        HttpClientTestingModule
      ],
      providers: [
        { provide: SearchService, useValue: mockSearchService },
        { provide: FormBuilder, useVale: mockFormBuilder}
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check url form control to be invalid when the value is null', () => {
    // Assert
    expect(component.searchForm.controls.url.valid).toBeFalse();
  });

  it('should value for searchTerm be invalid when the value is more than 100', () => {
    // Arrange
    component.searchForm.patchValue({
      url: 'test.co.uk',
      searchTerm: 'asdsadsadasdasdsadsadlshdfjklhsdkgjhvbn cx,mnvbjksdfhjkshdgbns,vmnbcx,mnvb,mcxnjghsdfgkjhdsgkjhfsjkha'
    });

    // Assert
    expect(component.searchForm.controls.searchTerm.errors['maxlength']).toBeTruthy();
  });

  it('should value for search form be valid', () => {
    // Arrange
    component.searchForm.patchValue({
      url: 'test.co.uk',
      searchTerm: 'search term'
    });

    // Assert
    expect(component.searchForm.valid).toBeTrue();
  });
});
