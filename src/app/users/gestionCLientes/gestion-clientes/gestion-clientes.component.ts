import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-gestion-clientes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './gestion-clientes.component.html',
  styleUrls: ['./gestion-clientes.component.scss'],
})
export class GestionClientesComponent implements OnInit {
  ngOnInit(): void { }


  idCliente = 1;


  metricas = {
    totalClientes: 0,
    porTipo: {
      corporativo: 0,
      personaFisica: 0
    },
    porPrioridad: {
      alta: 0,
      media: 0,
      baja: 0
    }
  };



  clientes: any[] = [];

  clienteSeleccionado: any = null;

  historial: any[] = [];



  nuevoCliente = {

    id: null,

    nombre: '',

    empresa: '',

    ubicacion: '',

    prioridad: 'Alta',

    tipo: 'Empresa',

    estadoComercial: 'Sin Contactar',

    estadoConexion: 'En Línea'

  };





  guardarCliente(): void {


    // EDITAR CLIENTE
    if (this.nuevoCliente.id !== null) {


      const index = this.clientes.findIndex(
        cliente => cliente.id === this.nuevoCliente.id
      );


      if (index !== -1) {


        this.clientes[index] = {
          ...this.nuevoCliente
        };


        console.log(
          'Cliente actualizado:',
          this.clientes[index]
        );


      }


    }

    // CREAR CLIENTE NUEVO
    else {

      const clienteNuevo = {

        ...this.nuevoCliente,

        id: this.idCliente++

      };


      this.clientes.push(clienteNuevo);


      console.log(
        'Cliente creado:',
        clienteNuevo
      );


    }



    this.metricas.totalClientes =
      this.clientes.length;



    this.actualizarMetricas();



    this.resetFormulario();



    console.log(
      'Clientes:',
      this.clientes
    );

  }





  abrirHistorial(cliente: any): void {


    this.clienteSeleccionado = cliente;


    this.historial = [

      {
        tipoInteraccion: 'Llamada',
        descripcion: 'Cliente contactado',
        fechaInteraccion: new Date().toLocaleString()
      },

      {
        tipoInteraccion: 'Correo',
        descripcion: 'Se envió información',
        fechaInteraccion: new Date().toLocaleString()
      }

    ];

  }





  cerrarHistorial(): void {


    this.clienteSeleccionado = null;


    this.historial = [];


  }


  eliminarCliente(id: number): void {


    this.clientes = this.clientes.filter(
      cliente => cliente.id !== id
    );


    this.metricas.totalClientes = this.clientes.length;


    this.actualizarMetricas();


  }






  editarCliente(cliente: any): void {


    this.nuevoCliente = {

      ...cliente

    };


  }






  actualizarMetricas(): void {


    this.metricas.porTipo.corporativo =
      this.clientes.filter(
        c => c.tipo === 'Empresa'
      ).length;



    this.metricas.porTipo.personaFisica =
      this.clientes.filter(
        c => c.tipo === 'Individual'
      ).length;



    this.metricas.porPrioridad.alta =
      this.clientes.filter(
        c => c.prioridad === 'Alta'
      ).length;



    this.metricas.porPrioridad.media =
      this.clientes.filter(
        c => c.prioridad === 'Media'
      ).length;



    this.metricas.porPrioridad.baja =
      this.clientes.filter(
        c => c.prioridad === 'Baja'
      ).length;


  }





  resetFormulario(): void {


    this.nuevoCliente = {


      id: null,


      nombre: '',


      empresa: '',


      ubicacion: '',


      prioridad: 'Alta',


      tipo: 'Empresa',


      estadoComercial: 'Sin Contactar',


      estadoConexion: 'En Línea'


    };
  }
}