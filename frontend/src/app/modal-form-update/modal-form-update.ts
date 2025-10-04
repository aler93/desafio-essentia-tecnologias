import { Component, input, InputSignal, Output, EventEmitter } from '@angular/core';
import {FormsModule} from "@angular/forms";
import axios from 'axios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-form-update',
    imports: [
        FormsModule
    ],
  templateUrl: './modal-form-update.html',
  styleUrl: './modal-form-update.css'
})

export class ModalFormUpdate {
  /*public formUpdate = {
    id: 0,
    title: "",
    description: "",
  }*/
  @Output() appGet = new EventEmitter();

  formData: InputSignal<any> = input<any>({ id: 0, title: "", description: "" });

  update(id: Number) {
    axios.put("/to-do/" + id, this.formData()).then((response) => {
      this.appGet.emit();
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
    Swal.fire({
      icon: "warning",
      title: "Confirmar ação",
      html: "Confirmar exclusão da tarefa? Cuidado, essa ação não pode ser desfeita",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Remover tarefa",
      cancelButtonText: "Cancelar",
    }).then((r) => {
      if( r.isConfirmed ) {
        axios.delete("/to-do/" + id).then((response) => {
          this.appGet.emit();
          const btnClose = document.getElementById("btn-close-modal-update-item")
          if(btnClose) {
            btnClose.click()
          }
        }).catch((err)=> {
          console.error(err);
        })
      }
    })
  }

  protected readonly JSON = JSON;
}
