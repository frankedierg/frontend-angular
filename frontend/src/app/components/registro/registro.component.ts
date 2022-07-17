import { Component, OnInit } from '@angular/core';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionService } from 'src/app/servicios/peticion.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  fname:string = ""
  mname:string = ""
  lname:string = ""
  slname:string = ""
  email:string = ""
  password:string = ""
  confirmar:string = ""
//VARIABLES PARA VALIDACIÓN
  errornombre:string = ""
  erroremail:string =""

  constructor(private peticion:PeticionService,private msg:MensajesService) { }



  ngOnInit(): void {
  }
//VALIDACION EN EL FRONTEND
  validar(){
    this.errornombre = ""
    this.erroremail = ""
    if(this.fname == "" || this.fname == null || this.fname == undefined){
      this.errornombre = "El campo Primer nombre es obligatorio"
    }
    if(this.email == "" || this.email == null || this.email == undefined){
      this.erroremail = "El campo email es obligatorio"
    }

  }

  registrar(){
    this.validar()

    if (this.erroremail == "" && this.errornombre == "") {
       //PETICIÓN

    var post = {
      host: this.peticion.urlLocal,
      path:'/usuarios/registro',
      payload:{
        fname: this.fname,
        mname: this.mname,
        lname: this.lname,
        slname:this.slname,
        email:this.email,
        password:this.password,
        confirmar:this.confirmar

      }
    }
    //FIN PETICION

    this.peticion.Post(post.host + post.path,post.payload).then((res:any)=>{
      console.log(res)
      if (res.state == true) {
        this.msg.Agregarmensaje('success',res.mensaje,15000)
      }
      else{
        this.msg.Agregarmensaje('danger',res.mensaje,5000)
      }
      
    })
    }
    else{
      this.msg.Agregarmensaje('danger','Error en uno o varios campos',5000)
    }

   
}

}
