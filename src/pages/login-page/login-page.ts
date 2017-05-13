import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { Auth } from '../../providers/auth';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup-page/signup-page';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html',
})
export class LoginPage {

  email: string;
  password: string;
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams , public authService: Auth, 
   public loadingCtrl: LoadingController , public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {

       this.showLoader();
 
        //Revisa si el usuario tenia una sesion abierta
        this.authService.checkAuthentication().then((res) => {
            console.log("Tenias una sesion abierta");
            this.navCtrl.setRoot(HomePage);
            this.loading.dismiss();
        }, (err) => {
            console.log("No estas autorizado");
            this.loading.dismiss();
        });

  }

  login(){
 
        this.showLoader();
 
        let credentials = {
            email: this.email,
            password: this.password
        };
 
        this.authService.login(credentials).then((result) => {
            this.loading.dismiss();
            this.navCtrl.setRoot(HomePage);
        }, (err) => {

            let respuesta = err.json();

            let toast = this.toastCtrl.create({
                message: respuesta.message,
                duration: 3000
            });

            this.loading.dismiss();
            toast.present();
            
        });
 
    }
 
    launchSignup(){
        this.navCtrl.push(SignupPage);
    }
 
    showLoader(){
 
        this.loading = this.loadingCtrl.create({
            content: 'Iniciando...'
        });
 
        this.loading.present();
 
    }

}
