import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DetailCategory } from 'src/app/home/interfaces/category';
import { DetailSalary } from 'src/app/home/interfaces/salary';
import { FilterService } from 'src/app/home/services/filter.service';
import { DataVacant } from '../../shared/interfaces/vacant';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { VacantService } from '../services/vacant.service';
import { ResponseError } from 'src/app/shared/interfaces/error';
import { StorageService } from 'src/app/shared/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-vacant',
  templateUrl: './new-vacant.component.html',
  styleUrls: ['./new-vacant.component.css'],
})
export class NewVacantComponent implements OnInit, OnDestroy {
  uid: string = '';
  salaries: DetailSalary[] = [];
  categories: DetailCategory[] = [];
  salariesSubscription!: Subscription;
  categoriesSubscription!: Subscription;
  formatsRequired: string[] = ['image/gif', 'image/png', 'image/jpeg'];
  image!: File;
  createVacantSubscription!: Subscription;
  errors: ResponseError[] = [];
  errorMesagges: string[] = [];

  vacantForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    salary: ['', Validators.required],
    category: ['', Validators.required],
    company: ['', Validators.required],
    lastDate: ['', Validators.required],
    description: ['', Validators.required],
    image: ['', Validators.required],
  });

  constructor(
    private filterService: FilterService,
    private fb: FormBuilder,
    private authService: AuthService,
    private vacantService: VacantService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.uid = this.authService.dataUser ? this.authService.dataUser.uid : '';
    this.getCategories();
    this.getSalaries();
  }

  getCategories() {
    this.categoriesSubscription = this.filterService
      .getCategories()
      .subscribe(({ categories, total }) => {
        this.categories = categories;
      });
  }

  getSalaries() {
    this.salariesSubscription = this.filterService
      .getSalaries()
      .subscribe(({ salaries, total }) => {
        this.salaries = salaries;
      });
  }

  validateField(field: string): boolean | undefined {
    return (
      this.vacantForm.get(field)?.invalid && this.vacantForm.get(field)?.touched
    );
  }

  onFileChange(event: any) {
    const image: File = event.target.files[0];
    if (!this.formatsRequired.includes(image.type)) {
      Notify.failure('Formato invalido, solo se permiten imágenes.');
      this.vacantForm.get('image')?.reset();
      return;
    }
    this.image = image;
  }

  createVacant() {
    if (this.vacantForm.valid) {
      const { title, salary, category, company, lastDate, description } =
        this.vacantForm.value;
      const data: DataVacant = {
        author: this.uid,
        title,
        salary,
        category,
        company,
        lastDate,
        description,
        image: '0',
      };
      this.createVacantSubscription = this.vacantService
        .createVacant(data)
        .subscribe((response) => {
          if (response.status === 400) {
            this.errorMesagges = [];
            const errors: ResponseError[] = response.error.errors;
            errors.forEach(({ msg }, index) => {
              this.errorMesagges.push(msg);
            });
            return;
          }
          Notify.success('Vacante creada y publicada con éxito.');
          this.storageService.saveFileSuscribe(
            'vacants',
            response.vacant.uid,
            this.image
          );
          this.router.navigateByUrl('/vacants');
        });
    } else {
      this.vacantForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.salaries = [];
    this.categories = [];

    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }

    if (this.salariesSubscription) {
      this.salariesSubscription.unsubscribe();
    }
  }
}
