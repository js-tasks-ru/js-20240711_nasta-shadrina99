export default class SortableTable {
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;

    this.element = this.render();
  }

  getSortOrder(param, sorting) {
    if (param === 'asc') {
      this.data = sorting;
    }

    if (param === 'desc') {
      this.data = sorting.reverse();
    }
  }

  sortString(field, param) {
    console.log('string');

    const newArray = [...this.data];
    const sorting = newArray.sort((a, b)=> a[field].localeCompare(b[field], ['ru', 'en'], { caseFirst: "upper" }));
    this.getSortOrder(param, sorting);
    this.update();
  }

  sortNumber(field, param) {
    console.log('number');

    const newArray = [...this.data];
    const sorting = newArray.sort((a, b)=> a[field] - b[field]);
    this.getSortOrder(param, sorting);
    this.update();
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

  createHeaderTemplate() {
    return this.headerConfig.map(cell => {
      return  `
          <div class="sortable-table__cell" data-id="images" data-sortable="false" data-order="asc">
            <span>${cell.title}</span>
          </div>
      `;
    }).join('');
  }

  createBodyTemplate() {
    return this.data.map(item => {
      return `
        <a href="/products/3d-ochki-epson-elpgs03" class="sortable-table__row">
            <div class="sortable-table__cell">
              <img class="sortable-table-image" alt="Image" src="http://magazilla.ru/jpg_zoom1/246743.jpg">
            </div>
            <div class="sortable-table__cell">${item.title}</div>

            <div class="sortable-table__cell">${item.quantity}</div>
            <div class="sortable-table__cell">${item.price}</div>
            <div class="sortable-table__cell">${item.sales}</div>
        </a>
      `;
    }).join('');
  }

  getTemplate() {
    return `
      <div data-element="productsContainer" class="products-list__container">
        <div class="sortable-table">

        <div data-element="header" class="sortable-table__header sortable-table__row">${this.createHeaderTemplate()}</div>

        <div data-element="body" class="sortable-table__body">${this.createBodyTemplate()}</div>

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

  createTemplate() {
    const div = document.createElement('div');
    div.innerHTML = this.getTemplate();
    return div.firstElementChild;
  }

  update() {

  }

  render() {
    this.element = this.createTemplate();
    return this.element;
  }

  remove() {
    this.element.remove();
  }

  destroy() {
   this.remove();
  }
}

