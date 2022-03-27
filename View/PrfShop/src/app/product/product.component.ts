import { Component, OnInit } from '@angular/core';
import {Product} from "../models/product";
import {ProductService} from "../services/product.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productForm: FormGroup
  products: Product[] = [
  ]


  constructor(private formBuilder: FormBuilder, private productService: ProductService) {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      quantity: ['', [Validators.required]],
      price: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (products) => {
        this.products = products
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  onAddProduct() {
    if (this.productForm.invalid) {
      return;
    }

    const product: Product = this.productForm.value
    this.productService.add(product).subscribe({
      next: (product) => {
        this.products.push(product)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  onDeleteProduct(id: string) {
    this.productService.delete(id).subscribe({
      next: (id) => {
        console.log(id)
        this.products.forEach((value, index) => {
          if (value.name == id) this.products.splice(index, 1)
        })
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
