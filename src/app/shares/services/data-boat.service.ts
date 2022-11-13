import { BehaviorSubject, Observable, Subject, catchError, debounceTime, delay, of, switchMap, tap, throwError } from 'rxjs';
import { BoatApisService, BoatDto, BoatInput, BoatResponse } from 'src/api';
import { Inject, Injectable } from '@angular/core';
import { SortColumn, SortDirection } from 'src/app/cores/directives/sortable.directive';

import { CustomToastService } from 'src/app/cores/services/custom-toast.service';
import { NavigationService } from 'src/app/cores/services/navigation.service';

interface SearchResult {
	boats: BoatDto[];
	total: number;
}

interface State {
	page: number;
	pageSize: number;
	searchTerm: string;
	sortColumn: SortColumn;
	sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

function sort(boats: BoatDto[], column: SortColumn, direction: string): BoatDto[] {
	if (direction === '' || column === '') {
		return boats;
	} else {
		return [...boats].sort((a, b) => {
			const res = compare(a[column], b[column]);
			return direction === 'asc' ? res : -res;
		});
	}
}

function matches(boatDto: BoatDto, term: string) {
	return (
		boatDto.name.toLowerCase().includes(term.toLowerCase()) ||
		boatDto.description.toLowerCase().includes(term.toLowerCase())
	);
}

@Injectable({
  providedIn: 'root'
})
export class DataBoatService {
  private _loading$ = new BehaviorSubject<boolean>(true);
	private _search$ = new Subject<void>();
	private _boats$ = new BehaviorSubject<BoatDto[]>([]);
	private _total$ = new BehaviorSubject<number>(0);
  private _boats :BoatDto[] = [];

	private _state: State = {
		page: 1,
		pageSize: 5,
		searchTerm: '',
		sortColumn: '',
		sortDirection: '',
	};

	constructor(private boatApiService:BoatApisService,
    private navigationService:NavigationService,
    private customToastService :CustomToastService,) {
    this.boatApiService.findBoats().subscribe((response:BoatResponse)=>{
      if(response){
        this._boats = [...response.boats]
        this.initSearch();
      }
    });
	}

  private initSearch() {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false))
      )
      .subscribe((result) => {
        this._boats$.next(result.boats);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

	get boats$() {
		return this._boats$.asObservable();
	}
	get total$() {
		return this._total$.asObservable();
	}
	get loading$() {
		return this._loading$.asObservable();
	}
	get page() {
		return this._state.page;
	}
	get pageSize() {
		return this._state.pageSize;
	}
	get searchTerm() {
		return this._state.searchTerm;
	}

	set page(page: number) {
		this._set({ page });
	}
	set pageSize(pageSize: number) {
		this._set({ pageSize });
	}
	set searchTerm(searchTerm: string) {
		this._set({ searchTerm });
	}
	set sortColumn(sortColumn: SortColumn) {
		this._set({ sortColumn });
	}
	set sortDirection(sortDirection: SortDirection) {
		this._set({ sortDirection });
	}

	private _set(patch: Partial<State>) {
		Object.assign(this._state, patch);
		this._search$.next();
	}

	private _search(): Observable<SearchResult> {
		const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

		// 1. sort
		let boats = sort(this._boats, sortColumn, sortDirection);

		// 2. filter
		boats = boats.filter((boat) => matches(boat, searchTerm));
		const total = boats.length;

		// 3. paginate
		boats = boats.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
		return of({ boats, total });
	}

  addBoat(input:BoatInput):void {
    this.boatApiService.createBoat(input).pipe(
      catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          this.customToastService.error(err.error.message);
          return throwError(()=>err);
      })
  ).subscribe(
      (boat:BoatDto)=>{
        if(boat){
          this.customToastService.success("Boat successfully created !");
          this._boats.push(boat);
          this._boats$.next(this._boats);
          this.navigationService.backToPreviousPage();
        }
      }
      );
  }

  updateBoat(id:number, input:BoatInput):void {
    this.boatApiService.updateBoat(id, input).pipe(
      catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          this.customToastService.error(err.error.message);
          return throwError(()=>err);
      })
  ).subscribe(
    boat =>{
      if(boat){
        this.customToastService.success("Boat successfully upadted !");
        this.updateBoats(boat);
        this._boats$.next(this._boats);
        this.navigationService.backToPreviousPage();
      }
    }
    );
  }

  updateBoats(boat:BoatDto):void{
    const index= this._boats.findIndex(v=>v.id===boat.id);
    if(index !== -1) {
        this._boats[index] = boat;
    }
  }

  deleteBoat(id:number):void{
    this.boatApiService.deleteBoat(id).pipe(
      catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          this.customToastService.error(err.error.message);
          return throwError(()=>err);
      })
  ).subscribe(
    success =>{
      const index= this._boats.findIndex(v=>v.id===id);
      if(index !== -1) {
          this._boats.splice(index, 1);
          this._boats$.next(this._boats);
          this.customToastService.success("Boat successfully deleted !");
      }
    }
    );
  }

  getBoatById(id:number) : Observable<BoatDto> {
    return this.boatApiService.getBoatById(id);
  }
}
