import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import axios from 'axios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-login',
  imports: [
    FormsModule
  ],
  templateUrl: './modal-login.html',
  styleUrl: './modal-login.css'
})
export class ModalLogin {
  @Output() appCheckAuth = new EventEmitter();

  protected formLogin = {
    email: "",
    password: ""
  }
  protected formCreate = {
    name: "",
    email: "",
    password: ""
  }
  protected viewCreate: Boolean = false
  login() {
    if( this.formLogin.email.length <= 0 || this.formLogin.password.length <= 0) {
      Swal.fire({
        icon: "info",
        title: "Digite seu e-mail e senha para efetuar login"
      })
      return
    }
    axios.post("/login", this.formLogin).then((r) => {
      sessionStorage.setItem("access_token", r.data.access_token)

      let user = r.data.user
      delete user.password
      sessionStorage.setItem("user", JSON.stringify(user))

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Acesso autorizado"
      });

      const btnClose = document.getElementById("btn-close-modal-login")
      if( btnClose ) {
        btnClose.click()
      }

      this.formLogin = {
        email: "",
        password: ""
      }

      this.appCheckAuth.emit()
    }).catch((err)=> {
      console.error(err);
      Swal.fire({
        icon: "warning",
        title: "Não foi possível validar seu acesso",
        html: err.response?.data?.message
      })
    })
  }
  createUser() {
    axios.post("/user", this.formCreate).then((r) => {
      this.formLogin.email = this.formCreate.email
      this.formLogin.password = this.formCreate.password

      this.formCreate = {
        name: "",
        email: "",
        password: ""
      }

      this.viewCreate = false
      Swal.fire({
        icon: "success",
        title: "Usuário cadastrado com sucesso",
        html: "Clique em OK para continuar",
      }).then(()=> {
        this.login()
      })
    }).catch((err)=> {
      console.error(err);
      Swal.fire({
        icon: "warning",
        title: "Não foi possível validar seu acesso",
        html: err.response?.data?.message
      })
    })
  }
  toggleView() {
    this.viewCreate = !this.viewCreate
  }
  appCheckAccess() {}
}
