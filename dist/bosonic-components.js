(function() {
    

    Bosonic.registerElement(
        'b-datalist',
        {
    get options() {
        return this.querySelectorAll('option');
    }
}
    );
}());
(function() {
    

    Bosonic.registerElement(
        'b-dialog',
        {
    readyCallback: function () {
        var root = this.createShadowRoot();
        root.appendChild(this.template.content.cloneNode(true));
    },
    show: function () {
        this.setAttribute('visible', '');
    },
    showModal: function () {
        this.overlay = document.createElement('b-overlay');
        this.parentNode.appendChild(this.overlay);
        var that = this;
        document.addEventListener('keyup', function (e) {
            if (e.which === 27) {
                that.cancel();
            }
        }, false);
        this.show();
    },
    hide: function () {
        this.removeAttribute('visible');
        if (this.overlay) {
            this.parentNode.removeChild(this.overlay);
        }
        this.dispatchEvent(new CustomEvent('close'));
    },
    close: function () {
        this.hide();
    },
    open: function () {
        this.show();
    },
    cancel: function () {
        var doCancel = this.dispatchEvent(new CustomEvent('cancel', { cancelable: true }));
        if (doCancel) {
            this.hide();
        }
    },
    template: '        <div class="b-dialog">            <content></content>        </div>    '
}
    );
}());
(function() {
    

    Bosonic.registerElement(
        'b-overlay',
        {
    readyCallback: function () {
        this.appendChild(this.template.content.cloneNode(true));
    },
    template: '        <div class="b-overlay"></div>    '
}
    );
}());
(function() {
    var KEY = {
        ENTER: 13,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40
    };

    Bosonic.registerElement(
        'b-selectable',
        {
    get selectedItemIndex() {
        return Number(this.getAttribute('selected'));
    },
    readyCallback: function () {
        this.tabIndex = -1;
        this.addEventListener('click', this.clickHandler.bind(this), false);
        this.addEventListener('keydown', this.keydownHandler.bind(this), false);
    },
    attributeChanged: function (name, oldValue, newValue) {
        if (name === 'selected')
            this.selectedChanged(oldValue, newValue);
    },
    selectedChanged: function (oldValue, newValue) {
        this.dispatchEvent(new CustomEvent('b-select', { detail: { item: newValue } }));
        if (oldValue !== null) {
            this.getItem(oldValue).classList.remove('b-selectable-selected');
        }
        this.getItem(newValue).classList.add('b-selectable-selected');
    },
    clickHandler: function (e) {
        var itemIndex = this.getItems().indexOf(e.target);
        if (itemIndex !== -1) {
            this.setAttribute('selected', itemIndex);
            this.activate();
        }
    },
    keydownHandler: function (e) {
        switch (e.keyCode) {
        case KEY.ENTER: {
                this.activate();
                break;
            }
        case KEY.DOWN: {
                this.selectNextItem();
                break;
            }
        case KEY.UP: {
                this.selectPreviousItem();
                break;
            }
        default:
            return;
        }
    },
    activate: function () {
        this.dispatchEvent(new CustomEvent('b-activate', { detail: { item: this.getAttribute('selected') } }));
    },
    selectNextItem: function () {
        if (this.selectedItemIndex < this.getItemCount() - 1) {
            this.setAttribute('selected', this.selectedItemIndex + 1);
        }
    },
    selectPreviousItem: function () {
        if (this.selectedItemIndex > 0) {
            this.setAttribute('selected', this.selectedItemIndex - 1);
        }
    },
    getItem: function (pos) {
        return this.getItems()[pos] || null;
    },
    getItemCount: function () {
        return this.getItems().length;
    },
    getItems: function () {
        var target = this.getAttribute('target');
        var nodes = target ? this.querySelectorAll(target) : this.children;
        return Array.prototype.slice.call(nodes, 0);
    }
}
    );
}());