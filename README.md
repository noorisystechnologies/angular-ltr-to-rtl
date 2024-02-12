# FormArray

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## Methode for RTL
 very first install npm translator by using bellow command
 npm install @ngx-translate/core 
  

after intallation of translator you need to intall TranslateLoader by using bellow command
npm install @ngx-translalte/http-loader 

after both intallation you need to import both in app.module.ts 
import like that

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

 HttpClientModule,
 TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })

 bellow line wirte at end of the app.module.ts

 export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}   


 after that  
 wirte bellow code in your header
 <select class="form-control" #selectedLang (change)="switchLang(selectedLang.value)">
        <option *ngFor="let language of translate.getLangs()" [value]="language"
          [selected]="language === translate.currentLang">
          {{ language }}
        </option>
 </select>
  
and write code in ts file , in that component where your header is present

like if you write in app.component.html
then you write code in app.component.ts file

import TranslateService from the @ngx-translate/core

after that write in the constructor 

 public textDirection:any;
contructor(private translate:TranslateService){
     translate.addLangs(['en', 'ar']);
    if (localStorage.getItem("lang")) {
			this.browserLang = localStorage.getItem("lang");
		} else {
			this.browserLang = translate.getBrowserLang();
		}
		translate.use(this.browserLang.match(/en|ar/) ? this.browserLang : "en");
		translate.setDefaultLang(this.browserLang);
    this.translate.onLangChange.subscribe((event:LangChangeEvent)=>{
      if(event.lang == 'ar'){
        this.textDirection = 'rtl'
      }  
      else{
        this.textDirection = 'ltr'
      }
    })

}


after done it all you just write in html page 
at the main div
<div [dir]="textDirection">
......
</div>



