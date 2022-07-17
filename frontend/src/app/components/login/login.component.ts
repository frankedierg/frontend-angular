import { Component, OnInit } from '@angular/core';
import { PeticionService } from 'src/app/servicios/peticion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private peticion:PeticionService) { }

  email: String ="miemail@gmail.com"
  password: String = ""
  datos:any[] =[]
  respuestalogin:any

  ngOnInit(): void {
    
  }

  iniciar(){

    //PETICIÓN

    var post = {
      host: this.peticion.urlLocal,
      path:'/usuarios/login',
      payload:{
        email:this.email,
        password:this.password

      }
    }

    this.peticion.Post(post.host + post.path,post.payload).then((res:any)=>{
      console.log(res)
      this.respuestalogin = res
    })
    //FIN PETICION


    // this.datos.push(this.email)
    // localStorage.setItem('datos',JSON.stringify(this.datos))

  }

  eliminar(posicion:number){
    console.log(posicion)
    this.datos.splice(posicion,1)
    localStorage.setItem('datos',JSON.stringify(this.datos))


  }

}
