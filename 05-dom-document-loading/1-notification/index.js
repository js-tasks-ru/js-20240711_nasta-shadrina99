export default class NotificationMessage {
    static lastShownComponent;

    constructor(message = '', props = {}) {
        this.message = message || '';
        this.timerId = '';
        this.duration = props.duration;
        this.type = props.type || 'success';
        this.element = this.createElement();
    }

    createTemplate() {
        return `
            <div class="notification ${this.type}" style="--value:${this.duration / 1000}s">
                <div class="timer"></div>
                <div class="inner-wrapper">
                    <div class="notification-header">${this.type}</div>
                    <div class="notification-body">${this.message}</div>
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

    show(container = document.body) {
        this.changedLastShownComponent();
        container.append(this.element);
        this.setTimer();
    }

    changedLastShownComponent() {
        if (NotificationMessage.lastShownComponent) {
            NotificationMessage.lastShownComponent.destroy();
        }
        NotificationMessage.lastShownComponent = this;
    }

    setTimer() {
        this.timerId = setTimeout(() => this.destroy(), this.duration);
    }

    remove() {
        this.element.remove();
    }

    destroy() {
        clearTimeout(this.timerId);
       this.remove();
    }
}
