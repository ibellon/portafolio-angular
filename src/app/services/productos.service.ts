import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) { 

    this.cargarProductos();

  }

  private cargarProductos() {

    return new Promise((resolve, reject) => {


        this.http.get(
          'https://angular-html-3c911.firebaseio.com/productos_idx.json')
          .subscribe((resp: Producto[]) => {
              //console.log(resp); 
              this.productos = resp;
              this.cargando = false;
              /*setTimeout(()=>{
                this.cargando = false;
              }, 2000);*/
              resolve();
        });

    });

  }

  getProducto(id: string) {
    return this.http.get(
      'https://angular-html-3c911.firebaseio.com/productos/'+id+'.json');
  }

  buscarProducto(termino: string) {

    if (this.productos.length === 0) {
      // Cargar productos
      this.cargarProductos().then(() => {
        // Ejecutar después de tener los productos
        // Aplicar Filtro
        this.filtrarProductos(termino);
      });
    }
    else {
      // Aplicar filtro
      this.filtrarProductos(termino);
    }

    // console.log(this.productosFiltrado);

  }

  private filtrarProductos(termino: string) {

    // console.log(this.productos);

    termino = termino.toLocaleLowerCase();

    this.productosFiltrado = [];
    
    this.productos.forEach(prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();

      if (prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0) {
        this.productosFiltrado.push(prod);
      }

    });
  }
}
