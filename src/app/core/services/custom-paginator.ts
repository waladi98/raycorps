import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomPaginator extends MatPaginatorIntl {
  constructor() {
    super();
    this.nextPageLabel = ' Next page';
    this.previousPageLabel = ' Previous page';
    this.itemsPerPageLabel = 'Data Per Halaman';
  }

  getRangeLabel = function (page, pageSize, length) {
    if (length === 0 || pageSize === 0) {
      return '0 dari ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' dari ' + length;
  };
}