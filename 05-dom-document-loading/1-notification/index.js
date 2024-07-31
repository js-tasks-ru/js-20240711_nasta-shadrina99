export default class NotificationMessage {
    static lastShownComponent;

    constructor(message = '', props = {}) {
        this.message = message;
        this.props = props;
        this.elem = this.show();
    }

    getTemplate() {
        const {type = '', duration = 0} = this.props;

        return `
            <div class="notification ${type}" style="--value:${duration / 1000}s">
                <div class="timer"></div>
                <div class="inner-wrapper">
                    <div class="notification-header">${type}</div>
                    <div class="notification-body">${this.message}</div>
                </div>
            </div>
        `;
    }

    createElem() {
        const div = document.createElement('div');
        div.innerHTML = this.getTemplate();
        const firstElementChild = div.firstElementChild;
        return firstElementChild;
    }

    show() {
        this.hideUnnecessaryElements();
        this.elem = this.createElem();
        document.body.append(this.elem);
        return this.elem;
    }

    hideUnnecessaryElements() {
        const {duration = 0} = this.props;

        if (NotificationMessage.lastShownComponent) {
            NotificationMessage.lastShownComponent.delete();
        }
        
        NotificationMessage.lastShownComponent = this;

        setTimeout(() => this.delete(), duration);
    }

    delete() {
        this.elem.remove();
    }

    destroy() {
        this.delete();
    }
}
