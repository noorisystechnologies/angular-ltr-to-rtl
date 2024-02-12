import { HttpClient } from '@angular/common/http';
import { Component, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryService } from './country.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { event } from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'form-array';
  // signUpForm!:FormGroup;
  // userData!:FormGroup;
  // genders=['male','femle']
  booking_form!:FormGroup;
  pax_qty = 1;
  files: any[];
  total_price: string;
  package_details: any;
  countries 
 public textDirection:any;
  // public directionController = new TextDirectionController();
  browserLang: string;
  constructor(private fb:FormBuilder,private service:CountryService, public translate: TranslateService,private renderer:Renderer2){

    // this.renderer.setAttribute(document.body,'dir',this.directionController.textDirection)
    translate.addLangs(['en', 'ar']);
    // translate.setDefaultLang('en');
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


    this.service.getAllCountries().subscribe((res)=>{
      // console.log(res);
      this.countries = res;
   
    })

  }
  // get hobbyControls(){
  //   return(<FormArray>this.signUpForm.get('hobbies')).controls;
  // }
  // BaseUrl='http://localhost:3000/data';
  get t():FormArray{
    return <FormArray>this.booking_form.get('quantities');
  }
  ngOnInit(){
    // this.signUpForm = new FormGroup({
    //   'userData' : new FormGroup({
    //     'email':new FormControl('',Validators.required),
    //     'password':new FormControl('',Validators.required)
    //   }),
    //   'gender':new FormControl('',Validators.required),
    //   'hobbies':new FormArray([])
    // })
    this.booking_form = this.fb.group({
      username:['',[Validators.required]],
      email:['',[Validators.required]],
      mobile:['',[Validators.required]],
      quantities:new FormArray([])
    })
    this.files = new Array<any>(this.pax_qty);
  }

  // SignUp(){
  //   console.log(this.signUpForm.value)
  // }
  
  switchLang(lang: string) {
    this.translate.use(lang);
    // console.log(lang);
    localStorage.setItem('lang',lang)   

    
  }
  // chanegeToArabic(){
  //   $('body').addClass('rtl')
  // }
  // changeToEnglish(){
  //   $('body').removeClass('rtl')
  // }
  onChangeQuantity() {
    const numberOfPax = this.pax_qty || 0;
    if (this.t.length < numberOfPax) {
      for (let i = this.t.length; i < numberOfPax; i++) {
        this.t.push(this.fb.group({
          full_name: ['', [Validators.required]],
          dob: ['', Validators.required],
          nationality: ['', Validators.required],
          residence_nationality: ['', Validators.required],
          pass_no: ['', [Validators.required]],
          pass_img: ['', Validators.required],
        }));
      }
    } else {
      for (let i = this.t.length; i >= numberOfPax; i--) {
        this.files.splice(i, 1)
        this.t.removeAt(i);
      }
    }
  }
  quatityValidation(){
    if(this.pax_qty<=0){
      this.pax_qty = 1
    }
    this.total_price = (this.pax_qty * +this.package_details?.price_for_client).toFixed(2)
    this.files.length = this.pax_qty;
    this.onChangeQuantity()
  }
  // AddHobby(){
  //   const control = new FormControl('',[Validators.required]);
  //   (<FormArray>this.signUpForm.get('hobbies')).push(control);
  // }
  // quantity(){
  //     if(this.pax_qty<=0){
  //       this.pax_qty = 1
  //     }
  registor(){
    if(this.booking_form.valid){
      console.warn(this.booking_form.value)
    }
  }
 
  }
  // export class TextDirectionController{
  //   public textDirection: string;
  //   constructor(){
  //     this.CheckDirection()
  //   }
  //   public CheckDirection():void{
  //     const languge =  localStorage.getItem('lang');
  //     if(languge === 'ar'){
  //       this.textDirection = 'rtl';
  //     }
  //     if(languge === 'en'){
  //       this.textDirection = 'ltr';
  //     }
  //   }
 
  

