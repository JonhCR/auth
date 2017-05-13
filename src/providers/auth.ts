import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';


@Injectable()
export class Auth {

  public token: any;

  constructor(public http: Http ,  public storage: Storage) {
    //console.log('Hello Auth Provider');
  }

  //Chekea la autenticacion del usuario tratando de acceder a su dashboard
  checkAuthentication(){
 
    return new Promise((resolve, reject) => {
 
        //Trata de obtener el token si existe
        this.storage.get('token').then((value) => {
 
            this.token = value;

            //Envia el token en el header de la solicitud            
            let headers = new Headers({'Content-Type': 'application/json'});
            headers.append('Authorization','Bearer '+ this.token);

            this.http.get('http://laravelapi.dev/api/user/dashboard', {headers: headers})
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                }); 
 
        });         
 
    });
  }
  
  //Crea una nueva cuenta y loguea al usuario
  createAccount(details){
 
    return new Promise((resolve, reject) => {
 
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
 
        this.http.post('http://laravelapi.dev/api/register', JSON.stringify(details), {headers: headers})
          .subscribe(res => {
            let data = res.json(); //Obtiene la solicitud en json
            this.token = data.token;//El servidor devuelve un token de autenticacion
            this.storage.set('token', data.token); //Almacena el token devuelto por el servidor
            resolve(data);
          }, (err) => {
            reject(err);
          });
 
    });
 
  }
  
  //Loguea al usuario
  login(credentials){

    return new Promise((resolve, reject) => {
 
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
 
        this.http.post('http://laravelapi.dev/api/login', JSON.stringify(credentials), {headers: headers})
          .subscribe(res => {
            let data = res.json();
            this.token = data.token; //El servidor devuelve un token
            this.storage.set('token', data.token); //Almacena el token de autenticacion
            resolve(data);
            resolve(res.json());
          }, (err) => {
            console.log(err);
            reject(err);
          });
 
    });
 
  }
  
  //Cierra la sesion de un usuario invalida el token en el servidor y lo destruye localmente
  logout(){

    let headers = new Headers();

    //Envia el token en la url ?token=token para ser invalidado en el servidor
    this.http.get('http://laravelapi.dev/api/logout?token='+this.token, {headers: headers})
       .map(res => res.json())
       .subscribe(data => {
        console.log('La sesion fue finalizado con exito');
      }, (err) => {
        console.log('Ocurrio un error al tratar de cerrar la sesion en el servidor');
     });

     //Destruye el token local sin depender de la respuesta del servidor
     this.storage.set('token', ''); 
 
  }


}
