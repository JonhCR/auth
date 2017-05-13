import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { Todos } from '../../providers/todos';
import { Auth } from '../../providers/auth';
import { LoginPage } from '../login-page/login-page';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  todos: any;
  loading: any;

  constructor(public navCtrl: NavController, public todoService: Todos, public modalCtrl: ModalController, 
    public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController) {

  }
  
  //Evento cuando la vista fue cargada
  ionViewDidLoad(){
      this.todoService.getTodos().then((data) => {
          this.todos = data;
    }, (err) => {
         //console.log("no se cargaron las tareas por que no tienes autorizacion");
    });
  }
 
  //Añade una nueva tarea
  addTodo(){
 
    let prompt = this.alertCtrl.create({
      title: 'Añadir tarea',
      message: 'Describe la tarea:',
      inputs: [
        {
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Almacenar',
          handler: todo => {
                if(todo){
 
                    this.showLoader("Almacenando tarea...");
 
                    this.todoService.createTodo(todo).then((result) => {
                        this.loading.dismiss();
                        this.todos = result;
                        //console.log("Tarea creada");
                    }, (err) => {
                        this.loading.dismiss();
                        //console.log("No tienes permiso para crear una tarea");
                    });
 
                }
          }
        }
      ]
    });
 
    prompt.present();
 
  }
 
  //Elimina una tarea
  deleteTodo(todo){
 
    this.showLoader("Eliminando...");
 
    //Elimina la tarea de la base de datos usando el proveedor de todo para conectar el servicio
    this.todoService.deleteTodo(todo.id).then((result) => {
 
      this.loading.dismiss();
 
        //Remove locally
        let index = this.todos.indexOf(todo);
 
        if(index > -1){
            this.todos.splice(index, 1);
        }   
 
    }, (err) => {
        this.loading.dismiss();
        console.log(err);
    });
  }
 
  //Muestra el mensaje de carga cuando se ejecuta una accion al servidor
  showLoader(message){
 
    this.loading = this.loadingCtrl.create({
      content: message
    });
 
    this.loading.present();
 
  }
 
  //Cierra la session
  logout(){
 
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);
 
  }



}
