import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import axios from 'axios'
import {FormsModule} from '@angular/forms';
import Swal from "sweetalert2"
import {ModalFormUpdate} from './modal-form-update/modal-form-update';
import {ModalLogin} from './modal-login/modal-login';
import {Loader} from './loader/loader';

axios.defaults.baseURL = "http://localhost:5000/api";
axios.defaults.withCredentials = false;
axios.defaults.headers.post['Content-Type'] = 'application/json';
export default axios

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, ModalFormUpdate, ModalLogin, Loader],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = "TechX";
  protected readonly descriptionLimit = 45;
  protected items = [
    {
      id: 0,
      title: "debug",
      userId: null,
      userName: "Anônimo",
      description: "Exemplo de descrição",
      descriptionShort: "Exemplo...",
      createdAt: "2020-01-01",
      createdAtFormat: "",
      concludedAt: null,
      concludedAtFormat: "",
      user: {
        name: ""
      }
    }
  ];
  protected formCreate = {
    title: "",
    description: "",
  };
  protected formUpdate = {
    id: 0,
    title: "",
    description: "",
  };
  protected user = {
    id: 0,
    name: "",
    email: "",
  };
  protected userAuth = false;
  protected limit: Number = 50;
  protected page: Number = 1;
  protected loading: Boolean = true;
  protected card: Boolean = true;

  ngOnInit() {
    this.get()
    const view = localStorage.getItem("techx_view");
    if( !view ) {
      localStorage.setItem("techx_view", "1");
    } else {
      if( view === "0" ) {
        this.card = false;
      }
    }

    const formCreate = localStorage.getItem("techx_form_newtodo")
    if( formCreate ) {
      this.formCreate = JSON.parse(formCreate);
    }

    this.checkAccess()
  }
  setupUpdate(todo: any) {
    this.formUpdate.id = todo.id;
    this.formUpdate.title = todo.title;
    this.formUpdate.description = todo.description;
  }
  get() {
    this.loading = true
    axios.get("/to-do").then((response) => {
      this.items = response.data;
      this.items.map((row) => {
        row.userName = "Não identificado";
        if( row.user ) {
          row.userName = row.user.name
        }

        row.descriptionShort = row.description;
        row.createdAtFormat = new Date(row.createdAt).toLocaleString();
        if( row.concludedAt ) {
          row.concludedAtFormat = new Date(row.concludedAt).toLocaleString();
        }

        if(row.description && row.description.length > this.descriptionLimit) {
          row.descriptionShort = row.description.substring(0, this.descriptionLimit) + "...";
        }
      })

      this.loading = false
    }).catch((err)=> {
      Swal.fire({
        icon: "error",
        title: "Ocorreu um erro inesperado"
      })
      console.error(err);
      this.loading = false;
    })
  }
  toggleConclude(id: Number) {
    axios.patch("/to-do/" + id).then((response) => {
      console.log(response.data);
      this.items.map((row) => {
        if(row.id === id) {
          row.concludedAt = response.data.concludedAt;
          row.concludedAtFormat = new Date(response.data.concludedAt).toLocaleString();
        }
      })
      //this.get();
    }).catch((err)=> {
      console.error(err);
    })
  }
  create() {
    if( this.formCreate.title.length <= 0 ) {
      Swal.fire({
        icon: "info",
        title: "Digite um título para a tarefa"
      });
      return;
    }

    const headers: Record<string, string> = {};
    const accessToken = sessionStorage.getItem("access_token");
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    axios.post("/to-do", this.formCreate, {headers}).then((response) => {
      this.get();
      //this.items.push(response.data)
      localStorage.removeItem("techx_form_newtodo")

      this.formCreate = {
        title: "",
        description: "",
      }
    }).catch((err)=> {
      console.error(err);
    })
  }
  toggleView() {
    this.card = !this.card
    if( this.card ) {
      localStorage.setItem("techx_view", "1")
    } else {
      localStorage.setItem("techx_view", "0")
    }
  }
  persistForm() {
    localStorage.setItem("techx_form_newtodo", JSON.stringify(this.formCreate))
  }
  checkAccess() {
    const user = sessionStorage.getItem("user")
    if( user ) {
      this.user = JSON.parse(user)
      this.userAuth = true
    }
  }
}
