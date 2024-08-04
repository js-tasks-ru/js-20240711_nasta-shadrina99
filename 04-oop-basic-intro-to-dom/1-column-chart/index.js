export default class ColumnChart {
    chartHeight = 50;

    constructor(chartProps = {}) {
        this.chartProps = chartProps;

        this.element = this.update();
    }

    getTooltipValue(data, item) {
        return (item / Math.max(...data) * 100).toFixed(0);
    }

    getColumnProps(data) {
        const max =  Math.max(...data);
        
        return data.map(item => {
            return {
                value: Math.floor(item * 50 / max),
                percent: (item / max * 100).toFixed(0),
            };
        });
    }

    createChartData(data) {
        const columnProps = this.getColumnProps(data);
        return columnProps.map(({value, percent}) => `<div style="--value: ${value}" data-tooltip="${percent}%"></div>`).join('');
    }

    getLinkTemplate(link) {
        return link ? `<a href=${link} class="column-chart__link">View all</a>` : '';
    }

    getTemplate() {
        const {label = '', value = 0, data = [], link = '', formatHeading = (value) => value} = this.chartProps;

        return `
                <div class="column-chart ${!data.length ? "column-chart_loading" : ""}" style="--chartHeight: 50">
                    <div class="column-chart__title">
                        ${label}
                        ${this.getLinkTemplate(link)}
                    </div>
                    <div class="column-chart__container">
                        <div data-element="header" class="column-chart__header">${formatHeading(value)}</div>
                        <div data-element="body" class="column-chart__chart">${this.createChartData(data)}</div>
                    </div>
                </div>
        `;
    }

    update() {
        const div = document.createElement('div');
        div.innerHTML = this.getTemplate();
        this.element = div.firstElementChild;
        return this.element;
    }

    destroy() {
        this.remove();
    }

    remove() {
        this.element.remove();
    }
}
