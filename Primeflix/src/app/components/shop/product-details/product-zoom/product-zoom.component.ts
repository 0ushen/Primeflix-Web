import {
  Component,
  OnInit,
  Inject,
  ViewEncapsulation,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-zoom',
  templateUrl: './product-zoom.component.html',
  styleUrls: ['./product-zoom.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductZoomComponent implements OnInit {
  public product: any;
  public selectedProductImageIndex: any;

  @ViewChild('zoomImage', { static: true }) zoomImage: any;

  constructor(
    public dialogRef: MatDialogRef<ProductZoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: any; index: any }
  ) {
    this.product = data.product;
    this.selectedProductImageIndex = data.index;
  }

  ngOnInit() {}

  public close(): void {
    this.dialogRef.close();
  }
}
