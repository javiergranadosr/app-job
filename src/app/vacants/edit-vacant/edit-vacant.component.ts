import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DetailCategory } from 'src/app/home/interfaces/category';
import { DetailSalary } from 'src/app/home/interfaces/salary';
import { FilterService } from 'src/app/home/services/filter.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { VacantService } from '../services/vacant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataVacant } from '../interfaces/vacant';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { ResponseError } from 'src/app/shared/interfaces/error';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-edit-vacant',
  templateUrl: './edit-vacant.component.html',
  styleUrls: ['./edit-vacant.component.css'],
})
export class EditVacantComponent implements OnInit, OnDestroy {
  uid: string = '';
  salaries: DetailSalary[] = [];
  categories: DetailCategory[] = [];
  salariesSubscription!: Subscription;
  categoriesSubscription!: Subscription;
  detailVacantSubscription!: Subscription;
  updateVacantSubscription!: Subscription;
  errorMesagges: string[] = [];
  formatsRequired: string[] = ['image/gif', 'image/png', 'image/jpeg'];
  image!: File;
  imageSelected: string = '';
  id: string = '';

  vacantForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    salary: ['', Validators.required],
    category: ['', Validators.required],
    company: ['', Validators.required],
    lastDate: ['', Validators.required],
    description: ['', Validators.required],
    image: [''],
  });

  constructor(
    private fb: FormBuilder,
    private filterService: FilterService,
    private vacantService: VacantService,
    private activedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.id = this.activedRoute.snapshot.params['id'];
    this.getSalaries();
    this.getCategories();
    this.getDetailVacant();
  }

  initForm(vacant: DataVacant) {
    this.vacantForm.get('title')?.setValue(vacant.title);
    this.vacantForm.get('salary')?.setValue(vacant.salary._id);
    this.vacantForm.get('category')?.setValue(vacant.category._id);
    this.vacantForm.get('company')?.setValue(vacant.company);
    this.vacantForm.get('lastDate')?.setValue(vacant.lastDate);
    this.vacantForm.get('description')?.setValue(vacant.description);
  }

  getSalaries() {
    this.salariesSubscription = this.filterService
      .getSalaries()
      .subscribe(({ salaries, total }) => {
        this.salaries = salaries;
      });
  }

  getCategories() {
    this.categoriesSubscription = this.filterService
      .getCategories()
      .subscribe(({ categories, total }) => {
        this.categories = categories;
      });
  }

  getDetailVacant() {
    this.loadingService.loading('Cargando información…');
    this.detailVacantSubscription = this.vacantService
      .detailVacant(this.id)
      .subscribe((vacant) => {
        this.initForm(vacant);
        this.imageSelected = vacant.image as string;
        this.loadingService.removedLoading();
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

  editVacant() {
    if (this.vacantForm.valid) {
      const { title, salary, category, company, lastDate, description } =
        this.vacantForm.value;

      const data: DataVacant = {
        title,
        salary,
        category,
        company,
        lastDate,
        description,
      };

      this.updateVacantSubscription = this.vacantService
        .updateVacant(data, this.id)
        .subscribe((response) => {
          if (response.status === 400) {
            this.errorMesagges = [];
            const errors: ResponseError[] = response.error.errors;
            errors.forEach(({ msg }, index) => {
              this.errorMesagges.push(msg);
            });
            return;
          }

          if (this.image) {
            this.storageService.saveFileSuscribe(
              'vacants',
              response.vacant.uid,
              this.image
            );
          }

          Notify.success('Vacante actualizada con éxito.');
          this.router.navigateByUrl('/vacants');
        });
    } else {
      this.vacantForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.salaries = [];
    this.categories = [];

    if (this.detailVacantSubscription) {
      this.detailVacantSubscription.unsubscribe();
    }

    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }

    if (this.salariesSubscription) {
      this.salariesSubscription.unsubscribe();
    }

    if (this.updateVacantSubscription) {
      this.updateVacantSubscription.unsubscribe();
    }
  }
}
