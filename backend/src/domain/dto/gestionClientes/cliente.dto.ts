export interface crearClienteDTO {
    nombre: string;
    empresa?: string;
    ubicacion: string;
    prioridad: 'Alta' | 'Media' | 'Baja';
    tipo: 'Empresa' | 'Individual';
    estadoComercial: 'Negociación' | 'Contactado' | 'Perdido' | 'Sin Contactar';
}

export interface actualizarClienteDTO {
    nombre?: string;
    empresa?: string;
    ubicacion?: string;
    prioridad?: 'Alta' | 'Media' | 'Baja';
    tipo?: 'Empresa' | 'Individual';
    estadoComercial?: 'Negociación' | 'Contactado' | 'Perdido' | 'Sin Contactar';
    ultimaActividad?: Date;
}

export interface clienteResponseDTO {
    clienteId: number;
    nombre: string;
    empresa?: string;
    ubicacion: string;
    prioridad: string;
    tipo: string;
    estadoComercial: string;
    ultimaActividad?: Date;
    fechaCreacion?: Date;
    activo?: number;
    estadoConexion?: 'En Línea' | 'Inactivo';
}
export interface Cliente {
  nombre: string;
  empresa?: string;
  ubicacion: string;
  prioridad: 'Alta' | 'Media' | 'Baja';
  tipo: 'Empresa' | 'Individual';
  estadoComercial: 'Negociación' | 'Contactado' | 'Perdido' | 'Sin Contactar';
}