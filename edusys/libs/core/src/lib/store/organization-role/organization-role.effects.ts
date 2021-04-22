import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, mergeMap, map } from 'rxjs/operators';
import {
  organizationRoleCreateRequestAction,
  organizationRoleCreateResponseAction,
  organizationRoleDetailRequestAction,
  organizationRoleDetailResponseAction,
  organizationRoleEditRequestAction,
  organizationRoleEditResponseAction,
  organizationRoleErrorAction,
  organizationRoleListRequestAction,
  organizationRoleListResponseAction,
  organizationRoleDeleteRequestAction,
  organizationRoleDeleteResponseAction,
} from './organization-role.actions';
import { of } from 'rxjs';
import { OrganizationRoleService } from '../../services/organization-role/organization-role.service';

@Injectable()
export class OrganizationRoleEffects {
  constructor(private actions$: Actions, private organizationRoleService: OrganizationRoleService) {}

  fetchOrganizationRoleList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(organizationRoleListRequestAction),
      mergeMap(({ onSucceeded, onError }) =>
        this.organizationRoleService.fetchOrganizationRoleList().pipe(
          map((response) => {
            if (onSucceeded) {
              onSucceeded(response);
            }
            return organizationRoleListResponseAction({ response });
          }),
          catchError((error) => {
            if (onError) {
              onError(error);
            }
            return of(organizationRoleErrorAction({ error }));
          })
        )
      )
    )
  );

  fetchOrganizationRoleDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(organizationRoleDetailRequestAction),
      mergeMap(({ organizationRoleId, onSucceeded, onError }) =>
        this.organizationRoleService.fetchOrganizationRoleDetail(organizationRoleId).pipe(
          map((response) => {
            if (onSucceeded) {
              onSucceeded(response);
            }
            return organizationRoleDetailResponseAction({ response });
          }),
          catchError((error) => {
            if (onError) {
              onError(error);
            }
            return of(organizationRoleErrorAction({ error }));
          })
        )
      )
    )
  );

  createOrganizationRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(organizationRoleCreateRequestAction),
      mergeMap(({ payload, onSucceeded, onError }) =>
        this.organizationRoleService.createOrganizationRole(payload).pipe(
          map((response) => {
            if (onSucceeded) {
              onSucceeded(response);
            }
            return organizationRoleCreateResponseAction({ response });
          }),
          catchError((error) => {
            if (onError) {
              onError(error);
            }
            return of(organizationRoleErrorAction({ error }));
          })
        )
      )
    )
  );

  editOrganizationRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(organizationRoleEditRequestAction),
      mergeMap(({ payload, organizationRoleId, onSucceeded, onError }) =>
        this.organizationRoleService.editOrganizationRole(organizationRoleId, payload).pipe(
          map((response) => {
            if (onSucceeded) {
              onSucceeded(response);
            }
            return organizationRoleEditResponseAction({ response });
          }),
          catchError((error) => {
            if (onError) {
              onError(error);
            }
            return of(organizationRoleErrorAction({ error }));
          })
        )
      )
    )
  );

  deleteOrganizationRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(organizationRoleDeleteRequestAction),
      mergeMap(({ organizationRoleId, onSucceeded, onError }) =>
        this.organizationRoleService.deleteOrganizationRole(organizationRoleId).pipe(
          map(() => {
            if (onSucceeded) {
              onSucceeded();
            }
            return organizationRoleDeleteResponseAction();
          }),
          catchError((error) => {
            if (onError) {
              onError(error);
            }
            return of(organizationRoleErrorAction({ error }));
          })
        )
      )
    )
  );
}
