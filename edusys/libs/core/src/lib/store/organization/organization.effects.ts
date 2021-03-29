import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, mergeMap, map } from 'rxjs/operators';
import {
  organizationCreateRequestAction,
  organizationCreateResponseAction,
  organizationDetailRequestAction,
  organizationDetailResponseAction,
  organizationEditRequestAction,
  organizationEditResponseAction,
  organizationErrorAction,
  organizationListRequestAction,
  organizationListResponseAction,
  organizationDeleteRequestAction,
  organizationDeleteResponseAction,
  companyInfoDetailRequestAction,
  companyInfoDetailResponseAction,
  companyInfoEditRequestAction,
  companyInfoEditResponseAction,
  organizationAvailablePermissionsRequestAction,
  organizationAvailablePermissionsResponseAction,
} from './organization.actions';
import { of } from 'rxjs';
import { OrganizationService } from '../../services/organization/organization.service';

@Injectable()
export class OrganizationEffects {
  constructor(private actions$: Actions, private organizationService: OrganizationService) {}

  fetchOrganizationList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(organizationListRequestAction),
      mergeMap(({ onSucceeded, onError }) =>
        this.organizationService.fetchOrganizationList().pipe(
          map((response) => {
            if (!!onSucceeded) {
              onSucceeded(response);
            }
            return organizationListResponseAction({ response });
          }),
          catchError((error) => {
            if (!!onError) {
              onError(error);
            }
            return of(organizationErrorAction({ error }));
          })
        )
      )
    )
  );

  fetchOrganizationDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(organizationDetailRequestAction),
      mergeMap(({ organizationId, onSucceeded, onError }) =>
        this.organizationService.fetchOrganizationDetail(organizationId).pipe(
          map((response) => {
            if (!!onSucceeded) {
              onSucceeded(response);
            }
            return organizationDetailResponseAction({ response });
          }),
          catchError((error) => {
            if (!!onError) {
              onError(error);
            }
            return of(organizationErrorAction({ error }));
          })
        )
      )
    )
  );

  fetchOrganizationAvailablePermissions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(organizationAvailablePermissionsRequestAction),
      mergeMap(({ organizationId, onSucceeded, onError }) =>
        this.organizationService.fetchOrganizationAvailablePermissions(organizationId).pipe(
          map((response) => {
            if (!!onSucceeded) {
              onSucceeded(response);
            }
            return organizationAvailablePermissionsResponseAction({ response });
          }),
          catchError((error) => {
            if (!!onError) {
              onError(error);
            }
            return of(organizationErrorAction({ error }));
          })
        )
      )
    )
  );

  fetchCompanyInfoDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(companyInfoDetailRequestAction),
      mergeMap(({ onSucceeded, onError }) =>
        this.organizationService.fetchCompanyInfoDetail().pipe(
          map((response) => {
            if (!!onSucceeded) {
              onSucceeded(response);
            }
            return companyInfoDetailResponseAction({ response });
          }),
          catchError((error) => {
            if (!!onError) {
              onError(error);
            }
            return of(organizationErrorAction({ error }));
          })
        )
      )
    )
  );

  editCompanyInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(companyInfoEditRequestAction),
      mergeMap(({ payload, onSucceeded, onError }) =>
        this.organizationService.editCompanyInfoDetail(payload).pipe(
          map((response) => {
            if (!!onSucceeded) {
              onSucceeded(response);
            }
            return companyInfoEditResponseAction({ response });
          }),
          catchError((error) => {
            if (!!onError) {
              onError(error);
            }
            return of(organizationErrorAction({ error }));
          })
        )
      )
    )
  );

  createOrganization$ = createEffect(() =>
    this.actions$.pipe(
      ofType(organizationCreateRequestAction),
      mergeMap(({ payload, onSucceeded, onError }) =>
        this.organizationService.createOrganization(payload).pipe(
          map((response) => {
            if (!!onSucceeded) {
              onSucceeded(response);
            }
            return organizationCreateResponseAction({ response });
          }),
          catchError((error) => {
            if (!!onError) {
              onError(error);
            }
            return of(organizationErrorAction({ error }));
          })
        )
      )
    )
  );

  editOrganization$ = createEffect(() =>
    this.actions$.pipe(
      ofType(organizationEditRequestAction),
      mergeMap(({ payload, organizationId, onSucceeded, onError }) =>
        this.organizationService.editOrganization(organizationId, payload).pipe(
          map((response) => {
            if (!!onSucceeded) {
              onSucceeded(response);
            }
            return organizationEditResponseAction({ response });
          }),
          catchError((error) => {
            if (!!onError) {
              onError(error);
            }
            return of(organizationErrorAction({ error }));
          })
        )
      )
    )
  );

  deleteOrganization$ = createEffect(() =>
    this.actions$.pipe(
      ofType(organizationDeleteRequestAction),
      mergeMap(({ organizationId, onSucceeded, onError }) =>
        this.organizationService.deleteOrganization(organizationId).pipe(
          map(() => {
            if (!!onSucceeded) {
              onSucceeded();
            }
            return organizationDeleteResponseAction();
          }),
          catchError((error) => {
            if (!!onError) {
              onError(error);
            }
            return of(organizationErrorAction({ error }));
          })
        )
      )
    )
  );
}
