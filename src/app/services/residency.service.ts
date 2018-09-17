import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/internal/operators';
import { mapTo } from 'rxjs/internal/operators';
import { Residency } from '../models/residency.model';

@Injectable({
  providedIn: 'root'
})
export class ResidencyService {

  constructor(private http: HttpClient) { }

  fetchResidencies(): Observable<Residency[]> {
    const datas = [
      { id: 1, name: 'University of Alabama School of Dentistry at UAB' },
      { id: 2, name: 'Loma Linda University School of Dentistry' },
      { id: 3, name: 'University of California at Los Angeles School of Dentistry' },
      { id: 4, name: 'Herman Ostrow School of Dentistry of USC' },
      { id: 5, name: 'University of California at San Francisco School of Dentistry' },
      { id: 6, name: 'Veterans Affairs Greater Los Angeles Healthcare System' },
      { id: 7, name: 'University of Connecticut School of Dental Medicine' },
      { id: 8, name: 'Nova Southeastern University College of Dental Medicine' },
      { id: 9, name: 'University of Florida College of Dentistry' },
      { id: 10, name: 'The Dental College of Georgia at Augusta University' },
      { id: 11, name: 'US Army Dental Activity Ft. Gordon/Uniformed Services University of the Health Sciences' },
      { id: 12, name: 'University of Illinois at Chicago College of Dentistry' },
      { id: 13, name: 'Indiana University School of Dentistry' },
      { id: 14, name: 'Indiana University School of Dentistry' },
      { id: 15, name: 'University of Iowa College of Dentistry' },
      { id: 16, name: 'University of Louisville School of Dentistry' },
      { id: 17, name: 'Louisiana State University School of Dentistry' },
      { id: 18, name: 'University of Maryland School of Dentistry' },
      { id: 19, name: 'Navy Medicine Professional Development Center' },
      { id: 20, name: 'Tufts University School of Dental Medicine' },
      { id: 21, name: 'Harvard University School of Dental Medicine' },
      { id: 22, name: 'Boston University Goldman School of Dental Medicine' },
      { id: 23, name: 'University of Michigan School of Dentistry' },
      { id: 24, name: 'Veterans Affairs Medical Center - Detroit Dental Service' },
      { id: 25, name: 'University of Minnesota School of Dentistry' },
      { id: 26, name: 'Mayo Clinic School of Graduate Medical Education' },
      { id: 27, name: 'Mayo Clinic School of Graduate Medical Education' },
      { id: 28, name: 'Rutgers School of Dental Medicine' },
      { id: 29, name: 'Montefiore Medical Center - Dental Dept.' },
      { id: 30, name: 'University of Buffalo School of Dental Medicine' },
      { id: 31, name: 'Veterans Affairs Medical Center/New York' },
      { id: 32, name: 'New York University College of Dentistry' },
      { id: 33, name: 'Columbia University College of Dental Medicine' },
      { id: 34, name: 'University of Rochester Eastman Institute for Oral Health' },
      { id: 35, name: 'Stony Brook University School of Dental Medicine' },
      { id: 36, name: 'University of North Carolina at Chapel Hill School of Dentistry' },
      { id: 37, name: 'Ohio State University College of Dentistry' },
      { id: 38, name: 'University of Pennsylvania School of Dental Medicine' },
      { id: 39, name: 'University of Pittsburgh School of Dental Medicine' },
      { id: 40, name: 'University of Puerto Rico School of Dental Medicine' },
      { id: 41, name: 'University of Tennessee College of Dentistry' },
      { id: 42, name: 'Texas A&M University College of Dentistry' },
      { id: 43, name: 'The University of Texas School of Dentistry at Houston' },
      { id: 44, name: 'Michael E. DeBakey Veterans Affairs Medical Center/Houston' },
      { id: 45, name: 'Wilford Hall Ambulatory Surgical Center - 59th Medical Wing' },
      { id: 46, name: 'UT Health Science Center School of Dentistry, San Antonio' },
      { id: 47, name: 'University of Washington School of Dentistry' },
      { id: 48, name: 'West Virginia University School of Dentistry' },
      { id: 49, name: 'Zablocki VA Great Lakes/Milwaukee' },
      { id: 50, name: 'Marquette University School of Dentistry' },
    ];
    return of(null).pipe(
      mapTo(datas),
      delay(2000)
    ).pipe(map((res: any[]) => res.map(r => new Residency().deserialize(r))));
  }
}
