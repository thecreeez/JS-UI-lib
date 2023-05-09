class UIButton extends UIElement {
    static FILL_DEFAULT = [0, 0, 51];
    static FILL_HOVER = [0, 51, 204];
    static FILL_INACTIVE = [0, 0, 20];

    static getMinWidth() {
        return 50;
    }

    constructor( { manager, pos, text, onClick, isActive, isRender } ) {
        super({
            manager: manager,
            pos: pos,
            onClick: onClick,
            isActive: isActive,
            isRender: isRender
        })

        this._text = text;
        this._defaultFontSize = 15;
    }

    static createDefault({ manager, pos, text, onClick}) {
        return new UIButton({
            manager: manager,
            isActive: true,
            isRender: true,
            onClick: onClick,
            pos: pos,
            text: text
        })
    }

    render({ ctx, pos }) {
        this._manager.setFont(this._defaultFontSize, this._manager.defaultFont);
        this._manager.setFillColor(this._getColor())

        let size = this._getSize(ctx);

        let renderingPos = this._pos;

        if (pos)
            renderingPos = pos;

        let posOffset = [0,0];

        if (this.isClicked)
            posOffset[1] += 5;

        ctx.fillRect(renderingPos[0] - size[0] / 2 + posOffset[0], renderingPos[1] - size[1] + posOffset[1], size[0], size[1]);

        ctx.fillStyle = "white";
        ctx.fillText(this._text, renderingPos[0] - ctx.measureText(this._text).width / 2 + posOffset[0], renderingPos[1] - this._defaultFontSize * 0.3 + posOffset[1]);
    }

    _getSize(ctx) {
        this._manager.setFont(this._defaultFontSize, this._manager.defaultFont);

        let buttonWidth = ctx.measureText(this._text).width * 1.5;
        let buttonHeight = this._defaultFontSize * 1.3;

        if (buttonWidth < UIButton.getMinWidth())
            buttonWidth = UIButton.getMinWidth();

        return [buttonWidth, buttonHeight];
    }

    _getColor() {
        let r = UIButton.FILL_INACTIVE[0];
        let g = UIButton.FILL_INACTIVE[1];
        let b = UIButton.FILL_INACTIVE[2];

        if (!this.isActive)
            return `rgb(${r},${g},${b})`;

        if (this.isHover) {
            r = UIButton.FILL_HOVER[0] - UIButton.FILL_DEFAULT[0] * (1-this.animationState);
            g = UIButton.FILL_HOVER[1] - UIButton.FILL_DEFAULT[1] * (1-this.animationState);
            b = UIButton.FILL_HOVER[2] - UIButton.FILL_DEFAULT[2] * (1-this.animationState);
        } else {
            r = UIButton.FILL_DEFAULT[0] + UIButton.FILL_HOVER[0] * (1-this.animationState);
            g = UIButton.FILL_DEFAULT[1] + UIButton.FILL_HOVER[1] * (1-this.animationState);
            b = UIButton.FILL_DEFAULT[2] + UIButton.FILL_HOVER[2] * (1-this.animationState);
        }

        return `rgb(${r},${g},${b})`;
    }
}