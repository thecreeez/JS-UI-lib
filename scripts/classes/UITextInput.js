class UITextInput extends UIElement {
    static BACKGROUND = [200, 200, 200];
    static ACTIVE_STROKE = [0, 51, 204];

    static getMinWidth() {
        return 200;
    }

    constructor({ manager, pos, placeholder, isActive, isRender, maxSymbols, blackList, whiteList, value }) {
        super({
            manager: manager,
            pos: pos,
            isRender: isRender,
            isActive: isActive
        })

        this.value = value;
        this._placeholder = placeholder;
        this._defaultFontSize = 15;
        this._defaultWidth = UITextInput.getMinWidth();

        this.maxSymbols = maxSymbols;
        this.blackList = blackList;
        this.whiteList = whiteList;

        this.onClick = (elem) => {
            elem.getManager().setSelectedElem(elem);
        }

        this.type = "input"
    }

    static createDefault({ manager, pos, placeholder, maxSymbols, blackList, whiteList }) {
        return new UITextInput({
            manager: manager,
            pos: pos,
            placeholder: placeholder,
            isActive: true,
            isRender: true,
            maxSymbols: maxSymbols,
            blackList: blackList,
            whiteList: whiteList,
            value: ""
        })
    }

    render(canvas, ctx) {
        ctx.font = this._defaultFontSize + "px arial";

        let size = this._getSize();
        this._manager.setFillColor(this._getColor())

        ctx.fillRect(this._pos[0] - size[0] / 2, this._pos[1] - size[1], size[0], size[1]);

        if (this.isHover || this.isSelected()) {
            this.renderSelected(ctx);
        }

        if (this.value.length < 1) {
            this._manager.setFillColor("rgba(0,0,0,0.5)");
            ctx.fillText(this._placeholder, this._pos[0] - size[0] / 2 + 5, this._pos[1] - this._defaultFontSize * 0.3);
        } else {
            this._manager.setFillColor("rgba(0,0,0,1)");
            ctx.fillText(this.value, this._pos[0] - size[0] / 2 + 5, this._pos[1] - this._defaultFontSize * 0.3);
        }
    }

    renderSelected(ctx) {
        let size = this._getSize();

        this._manager.setStrokeColor(this._getStrokeColor());
        this._manager.setStrokeWidth(3 * this.animationState);
        ctx.strokeRect(this._pos[0] - size[0] / 2, this._pos[1] - size[1], size[0], size[1])
    }

    _getColor() {
        return `rgb(${UITextInput.BACKGROUND[0]},${UITextInput.BACKGROUND[1]},${UITextInput.BACKGROUND[2]})`
    }

    _getStrokeColor() {
        return `rgb(${UITextInput.ACTIVE_STROKE[0]},${UITextInput.ACTIVE_STROKE[1]},${UITextInput.ACTIVE_STROKE[2]})`
    }

    setValue(value) {
        this.value = value;
    }

    addInValue(symb) {
        if (this.isBlacklistEnabled() && this.isInBlackList(symb)) {
            return false;
        }

        if (this.isWhitelistEnabled() && !this.isInWhiteList(symb)) {
            return false;
        }

        if (this.maxSymbols <= this.value.length) {
            return false;
        }

        if (symb.length > 1) {
            return false;
        }

        this.value += symb;
    }

    getValue() {
        return this.value;
    }

    removeSymb() {
        if (this.value.length > 0) {
            this.value = this.value.slice(0, this.value.length - 1)
        }
    }

    _getSize() {
        let textInputWidth = this._defaultFontSize * 1.3;

        return [UITextInput.getMinWidth(), textInputWidth];
    }

    isWhitelistEnabled() {
        if (!this.whiteList)
            return false;

        return true;
    }

    isBlacklistEnabled() {
        if (!this.blackList)
            return false;

        return true;
    }

    isInBlackList(symb) {
        return false;
    }

    isInWhiteList(symb) {
        return true;
    }

    onkeydown(key, code) {
        if (code == "Backspace" && this.value.length > 0) {
            this.value = this.value.slice(0, this.value.length - 1)
        }

        if (this.isBlacklistEnabled() && this.isInBlackList(key)) {
            return false;
        }

        if (this.isWhitelistEnabled() && !this.isInWhiteList(key)) {
            return false;
        }

        if (this.maxSymbols <= this.value.length) {
            return false;
        }

        if (key.length > 1) {
            return false;
        }

        this.value += key;
    }
}