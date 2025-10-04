import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import axios from 'axios'
import {FormsModule} from '@angular/forms';
import Swal from "sweetalert2"
import {ModalFormUpdate} from './modal-form-update/modal-form-update';

axios.defaults.baseURL = "http://localhost:5000/api";
axios.defaults.withCredentials = false;
axios.defaults.headers.post['Content-Type'] = 'application/json';
export default axios

interface FormData {
  id: Number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, ModalFormUpdate],
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
      concludedAt: null,
      concludedAtFormat: null,
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
  protected limit: Number = 3;
  protected page: Number = 1;

  ngOnInit() {
    this.get()
  }
  setupUpdate(todo: any) {
    this.formUpdate.id = todo.id
    this.formUpdate.title = todo.title
    this.formUpdate.description = todo.description
  }
  get() {
    axios.get("/to-do").then((response) => {
      this.items = response.data;
      this.items.map((row) => {
        row.userName = "Anônimo"
        row.descriptionShort = row.description
        if(row.description.length > this.descriptionLimit) {
          row.descriptionShort = row.description.substring(0, this.descriptionLimit) + "..."
        }
      })
    }).catch((err)=> {
      console.error(err);
    })
  }
  toggleConclude(id: Number) {
    axios.patch("/to-do/" + id).then((response) => {
      console.log(response.data);
      this.items.map((row) => {
        if(row.id === id) {
          row.concludedAt = response.data.concludedAt
        }
      })
      //this.get();
    }).catch((err)=> {
      console.error(err);
    })
  }
  /*update(id: Number) {
    axios.put("/to-do/" + id, this.formUpdate).then((response) => {
      this.get();
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
        title: "Tarefa atualizada"
      });
      const btnClose = document.getElementById("btn-close-modal-update-item")
      if(btnClose) {
        btnClose.click()
      }
    }).catch((err)=> {
      console.error(err);
    })
  }
  delete(id: Number) {
    axios.delete("/to-do/" + id).then((response) => {
      this.get();
    }).catch((err)=> {
      console.error(err);
    })
  }*/
  create() {
    if( this.formCreate.title.length <= 0 ) {
      Swal.fire({
        icon: "info",
        title: "Digite um título para a tarefa"
      })
      return
    }

    axios.post("/to-do", this.formCreate).then((response) => {
      console.log(response.data);
      this.get();
      //this.items.push(response.data)

      this.formCreate = {
        title: "",
        description: "",
      }
    }).catch((err)=> {
      console.error(err);
    })
  }
}
