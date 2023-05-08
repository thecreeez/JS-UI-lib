class UISlider extends UIElement {
    static EMPTY_COLOR = [0, 0, 51];
    static FULL_COLOR = [0, 51, 204];

    static getMinWidth() {
        return 200;
    }

    constructor({ manager, pos, text, isActive, isRender, min, max, value }) {
        super({
            manager: manager,
            pos: pos,
            isRender: isRender,
            isActive: isActive
        })

        this.value = value;
        this.min = min;
        this.max = max;

        this._text = text;
        this._defaultFontSize = 20;

        this.onClick = (elem) => {
            elem.getManager().setSelectedElem(elem);
        }

        this.type = "input";
    }

    static createDefault({ manager, pos, text, min, max, value }) {
        return new UISlider({
            manager: manager,
            pos: pos,
            text: text,
            isActive: true,
            isRender: true,
            min: min,
            max: max,
            value: value
        })
    }

    render(canvas, ctx) {
        this._manager.setFont(this._defaultFontSize, this._manager.defaultFont);
        let size = this._getSize(ctx);

        ctx.fillStyle = `rgb(${UISlider.EMPTY_COLOR[0]},${UISlider.EMPTY_COLOR[1]},${UISlider.EMPTY_COLOR[2]})`;

        ctx.fillRect(this._pos[0] - size[0] / 2, this._pos[1] - size[1], size[0], size[1]);

        ctx.fillStyle = `rgb(${UISlider.FULL_COLOR[0]},${UISlider.FULL_COLOR[1]},${UISlider.FULL_COLOR[2]})`;
        ctx.fillRect(this._pos[0] - size[0] / 2, this._pos[1] - size[1], size[0] * this.getValueOffset(), size[1]);

        ctx.fillStyle = `white`;
        ctx.fillText(this.min, this._pos[0] - size[0] / 2 - this._defaultFontSize / 4, this._pos[1] - size[1] - 5);
        ctx.fillText(this.max, this._pos[0] + size[0] / 2 - this._defaultFontSize / 4, this._pos[1] - size[1] - 5);

        if (this.value != this.min && this.value != this.max)
            ctx.fillText(Math.round(this.value * 100) / 100, this._pos[0] - size[0] / 2 + size[0] * this.getValueOffset() - this._defaultFontSize / 2   , this._pos[1] - size[1] - 5);
    }

    update(deltaTime) {
        super.update(deltaTime);

        if (!this.isClicked && this.isSelected())
            this.getManager().setSelectedElem(null)
    }

    checkHover(pos) {
        if (this.isSelected()) {
            let size = this._getSize();

            let startWidth = (this._pos[0] - size[0] / 2);

            if (pos[0] - startWidth < 0) {
                this.value = this.min;
                return;
            }
            
            let proportion = (pos[0] - startWidth) / size[0];

            if (proportion > 1) {
                this.value = this.max;
                return;
            }

            this.value = (proportion * this.max);
        }
    }

    getValueOffset() {
        return this.value / this.max;
    }

    setValue(value) {
        this.value = value;
    }

    getValue() {
        return this.value;
    }

    _getSize(ctx) {
        return [UISlider.getMinWidth(), 10];
    }
}