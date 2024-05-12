import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHistoryComponent } from './search-history.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SearchResultDto } from '../models/search-result-dto.model';
import { of } from 'rxjs';

const mockSearchResultList: SearchResultDto[] = [
{
  url: 'Test 1',
  searchTerm: 'Search Test 1',
  ranking: '1, 2, 6',
  searchDate: new Date()
},
{
  url: 'Test 2',
  searchTerm: 'Search Test 2',
  ranking: '14, 16, 23',
  searchDate: new Date()
}
];

describe('SearchHistoryComponent', () => {
  let component: SearchHistoryComponent;
  let fixture: ComponentFixture<SearchHistoryComponent>;
  let mockSearchService;

  beforeEach(async () => {
    mockSearchService = jasmine.createSpyObj(['getAllSearchHistory']);
    mockSearchService.getAllSearchHistory.and.returnValue(of(mockSearchResultList));
    
    await TestBed.configureTestingModule({
      imports: [
        SearchHistoryComponent,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
