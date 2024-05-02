# HALE

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.5.

## Development  server

Use `ksoldevtestacct@gmail.com` as square test email.

Run `cd ./HALE_UX && npm run start` for a dev server. Navigate to `https://localhost:4201/`. The app will automatically reload if you change any of the source files.

Open `https://localhost:4200/auth/signup/` to register as a new Square Customer.
To sign in open  `https://localhost:4200/auth/signin/` enter your square customer email 'enter' then open `https://localhost:4200/home` to proceed.

For complete reproduction of  [Hale Health Services Locations](https://localhost:4201/locations) replace `*****` with a valid Google Maps API Key on `/HALE/HALE_UX/src/app/locations/locations.component.ts`

Replace `*****` with a valid Google Maps API Key on `/HALE/HALE_UX/src/app/admin/locations/new-location.component.ts` and in `/HALE/HALE_UX/src/app/admin/locations/edit-location.component.ts`

## Production Server

Open [Hale Health Services](https://halehealthservices.vercel.app/auth/signup) to register as new Square Customer.

Or use `ksoldevtestacct@gmail.com` on [Hale Health Services](https://halehealthservices.vercel.app/auth/signin) to continue.

To book a service navigate to [Hale Health Services Locations](https://halehealthservices.vercel.app/locations) - `Go to Location`.

Bookings Test Location: [Hale Health Service Bookings](https://halehealthservices.vercel.app/locations/view/L3H3J9ES9K3T3)

For Customer online payments: [Hale Health Services Online Payments](https://halehealthservices.vercel.app/checkout/payments) 


For Customer invoices: [Hale Health Services Invoices](https://halehealthservices.vercel.app/subscriptions) 

To subscribe for Medical/Health Covers: [Hale Health Services Medical/Health Covers](https://halehealthservices.vercel.app/health-covers) 

For Health providers Locations:  [Hale Health Services Locations](https://halehealthservices.vercel.app/locations)

Partner Login:  [Hale Health Services Partner Login](https://halehealthservices.vercel.app/admin)


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `cd ./HALE_UX && ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `cd ./HALE_UX &&ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `cd ./HALE_UX && ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `cd ./HALE_UX && ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## Start Convex 

Initalize convex by running `cd ./HALE_API && npm install && npx convex dev ` replace `./HALE_API/.env.local` with values from your convex project.
Follow [Convex development docs](https://docs.convex.dev/home) for configuration and further help.


## Authorization && Authentication

Replace `./HALE_UX/src/environments` values with your own as they are subject to change.

