import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Breadcrumb } from '../../entities/breadcrumb';
import { isFunction } from 'util';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {
  data: Breadcrumb[];
  routerSubscription: Subscription;

  constructor(public router: Router, public activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.buildBreadCrumb();
    this.routerSubscription = this.router.events.subscribe((event) => {
      if( event instanceof NavigationEnd) {
        this.buildBreadCrumb();
      }
    });
  }

  buildBreadCrumb(route: ActivatedRoute = this.activatedRoute.root, url: string = '',
                breadcrumbs: Array<Breadcrumb> = []): Array<Breadcrumb> {
    const label = route.routeConfig && route.routeConfig.data && route.routeConfig.data[ 'breadcrumb' ];

    const nextUrl = `${url}${route.snapshot.url.join('/')}/`;

    const newBreadcrumbs = [ ...breadcrumbs, {
      title: isFunction(label) ? label(route) : label,
      url: nextUrl
    }];

    if (route.firstChild) {
        return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    this.data = newBreadcrumbs;
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
