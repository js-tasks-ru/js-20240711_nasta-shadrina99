export default class SortableTable {
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.currentOrder = '';
    this.element = this.createElement();
    this.subElements = this.getSubElements();
  }

  setSortOrder(param, sortedData) {
    this.currentOrder = param;
    
    if (param === 'asc') {
      this.data = sortedData;
    }

    if (param === 'desc') {
      this.data = sortedData.reverse();
    }

    this.update();
  }

  sortString(field, param) {
    const sortedData = this.data.sort((a, b)=> a[field].localeCompare(b[field], ['ru', 'en'], { caseFirst: "upper" }));
    this.setSortOrder(param, sortedData);
  }

  sortNumber(field, param) {
    const sortedData = this.data.sort((a, b)=> a[field] - b[field]);
    this.setSortOrder(param, sortedData);
  }

  sort(field, param = 'asc') {
    const {sortType} = this.headerConfig.find(item => item.id === field);
    switch (sortType) {
      case 'number': 
        this.sortNumber(field, param);
        break;
      case 'string': 
        this.sortString(field, param);
        break;
    }
  }

  createHeaderCell(cell) {
    const {id, sortable, title} = cell;
    const dataSort = this.currentOrder ? `data-order="${this.currentOrder}"` : '';

    return `
      <div class="sortable-table__cell" data-name=${id} data-sortable=${sortable} ${dataSort}>
        <span>${title}</span>
      </div>
    `;
  }

  createHeader() {
    return this.headerConfig.map(cell => this.createHeaderCell(cell)).join('');
  }

  createBodyCell(headerItem, bodyItem) {
    if (headerItem.template) {
      return headerItem.template(bodyItem.images);
    }

    return `<div class="sortable-table__cell">${bodyItem[headerItem.id]}</div>`;
  }

  createBodyItem(bodyItem) {
    return `
      <a href="/products/${bodyItem.id}" class="sortable-table__row">
        ${this.headerConfig.map(headerItem => this.createBodyCell(headerItem, bodyItem)).join('')}
      </a>
    `; 
  }

  createBody() {
    return this.data.map(bodyItem => this.createBodyItem(bodyItem)).join('');
  }

  createTemplate() {
    return `
      <div data-element="productsContainer" class="products-list__container">
        <div class="sortable-table">

        <div data-element="header" class="sortable-table__header sortable-table__row">
           ${this.createHeader()}
        </div>

        <div data-element="body" class="sortable-table__body">
            ${this.createBody()}
        </div>

        <div data-element="loading" class="loading-line sortable-table__loading-line"></div>

        <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
          <div>
            <p>No products satisfies your filter criteria</p>
            <button type="button" class="button-primary-outline">Reset all filters</button>
          </div>
        </div>
      </div>
    </div>
    `;
  }

  createElement() {
    const div = document.createElement('div');
    div.innerHTML = this.createTemplate();
    this.element = div.firstElementChild;
    return this.element;
  }

  getSubElements() {
    return {
      header: this.element.querySelector(".sortable-table__header"),
      body: this.element.querySelector(".sortable-table__body"),
    };
  }

  update() {
    const {body} = this.getSubElements();
    body.innerHTML = this.createBody();
  }

  remove() {
    this.element.remove();
  }

  destroy() {
   this.remove();
  }
}

