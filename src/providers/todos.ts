import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Auth } from './auth';


@Injectable()
export class Todos {

  constructor(public http: Http , public authService: Auth) {
    //console.log('Hello Todos Provider');
  }

  //Obtiene todas las tareas del usuario logueado
  getTodos(){
 
    return new Promise((resolve, reject) => {
      
      //Envia el token almacenado el proveedor de Auth en el header
      let headers = new Headers();
      headers.append('Authorization','Bearer '+ this.authService.token);
      
      this.http.get('http://laravelapi.dev/api/user/tareas', {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
 
  }
  
  //Crea una nueva tarea
  createTodo(todo){
 
    return new Promise((resolve, reject) => {
      
      //Envia el token almacenado el proveedor de Auth en el header
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization','Bearer '+ this.authService.token);
      
      this.http.post('http://laravelapi.dev/api/user/tareas/create', JSON.stringify(todo), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
 
    });
 
  }
  
  //Elimina una tarea
  deleteTodo(id){

    return new Promise((resolve, reject) => {

        //Envia el token almacenado el proveedor de Auth en el header
        let headers = new Headers();
        headers.set('Authorization','Bearer '+ this.authService.token);
 
        this.http.post('http://laravelapi.dev/api/user/tareas/delete/'+ id ,{}, {headers: headers}).subscribe((res) => {
            resolve(res);
        }, (err) => {
            reject(err);
        });    
 
    });
 
  }

}
