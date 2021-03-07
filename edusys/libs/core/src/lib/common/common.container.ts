import { Location } from '@angular/common';
import { Component, Injector, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CoreTranslateService } from '@edusys/core-translate';
import { Schema } from '@hapi/joi';

@Component({
  template: '',
})
export abstract class CommonContainer implements OnDestroy {
  subscriptions = new Subscription();
  router: Router;
  activatedRoute: ActivatedRoute;
  locationRouter: Location;
  form: FormGroup;
  fb: FormBuilder;
  titleService: Title;
  translateService: CoreTranslateService;
  titleKey: string;

  constructor(injector: Injector) {
    this.router = injector.get(Router);
    this.locationRouter = injector.get(Location);
    this.fb = injector.get(FormBuilder);
    this.titleService = injector.get(Title);
    this.translateService = injector.get(CoreTranslateService);
    this.activatedRoute = injector.get(ActivatedRoute);
    this.subscriptions.add(
      this.translateService.onLangChange().subscribe((langChange) => {
        if (!!this.titleKey) {
          this.setTitle(this.titleKey);
        }
      })
    );
  }

  setTitle(title: string): void {
    this.titleKey = title;
    this.translateService.getTranslation$(title).subscribe((translated) => {
      this.titleService.setTitle(translated);
    });
  }
  getTitle(): string {
    return this.titleService.getTitle();
  }

  navigateTo = (url: string, p1?: string, p2?: string, p3?: string, p4?: string): void => {
    const routerLink = this.format(url, p1, p2, p3, p4);
    this.navigateByUrl(encodeURI(routerLink));
  };

  navigateToReplace = (url: string, p1?: string, p2?: string, p3?: string, p4?: string): void => {
    const routerLink = this.format(url, p1, p2, p3, p4);
    this.navigateByUrl(encodeURI(routerLink), { replaceUrl: true });
  };

  navigateByUrl = (page: string, extras?: NavigationExtras): void => {
    this.router.navigateByUrl(page, extras);
  };

  navigateToWithParams = (url: string, params: Params, replaceUrl?: boolean): void => {
    this.router.navigate([url], { replaceUrl, queryParams: params });
  };

  getUrl = (url: string, p1?: string, p2?: string, p3?: string, p4?: string): string => this.format(url, p1, p2, p3, p4);

  navigateBack = (): void => {
    this.locationRouter.back();
  };

  format(input: string, ...args: any[]): string {
    return input.replace(/{(\d+)}/g, (match, num) => (typeof args[num] !== 'undefined' ? args[num] : match));
  }

  createForm(form: any, schema?: Schema): void {
    if (!!schema) {
      this.form = this.fb.group(form, {
        validators: this.createValidatorFromSchema(schema),
      });
    } else {
      this.form = this.fb.group(form);
    }
  }

  setForm(data: any): void {
    if (!!this.form) {
      this.form.setValue(data);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  abstract onSuccess = (message?: string): void => {};

  abstract onError = (message?: string): void => {};

  private createValidatorFromSchema(schema: Schema): ValidatorFn {
    const validator: ValidatorFn = (group: FormGroup) => {
      // This is where the validation on the values of
      // the form group is run.
      const result = schema.validate(group.value, { abortEarly: false });

      if (result.error) {
        console.log(result.error.details);
        const errorObj = result.error.details.reduce((acc, current) => {
          console.log(current);
          const key = current.path.join('.');
          acc[key] = current;
          return acc;
        }, {});

        // Set error value on each control
        for (const key in errorObj) {
          const control = group.get(key);
          if (control) {
            control.setErrors({ [key]: errorObj[key] });
          }
        }

        // Return the error object so that we can access
        // the form’s errors via `form.errors`.
        console.log('errorObj :>> ', errorObj);
        return errorObj;
      } else {
        return null;
      }
    };

    return validator;
  }
}
