import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { HomePage } from '../home/home';

/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup-page',
  templateUrl: 'signup-page.html',
})
export class SignupPage {

  name: string;
  email: string;
  password: string;
  loading:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: Auth, public loadingCtrl: LoadingController) {
  }

 register(){
 
    this.showLoader();
 
    let details = {
        email: this.email,
        password: this.password,
        name: this.name
    };
 
    this.authService.createAccount(details).then((result) => {
      this.loading.dismiss();
      console.log(result);
      this.navCtrl.setRoot(HomePage);
    }, (err) => {
        this.loading.dismiss();
    });
 
  }
 
  showLoader(){
 
    this.loading = this.loadingCtrl.create({
      content: 'Autenticando...'
    });
 
    this.loading.present();
 
  }

}
