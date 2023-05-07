class UIButton extends UIElement {
    static getMinWidth() {
        return 200;
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

    render(canvas, ctx) {
        this._manager.setFont(this._defaultFontSize, "arial");
        this._manager.setFillColor(this._getColor())

        let buttonWidth = ctx.measureText(this._text).width * 1.5;
        let buttonHeight = this._defaultFontSize * 1.3;

        if (buttonWidth < UIButton.getMinWidth())
            buttonWidth = UIButton.getMinWidth();

        let posOffset = [0,0];

        if (this.isClicked)
            posOffset[1] += 5;

        ctx.fillRect(this._pos[0] - buttonWidth / 2 + posOffset[0], this._pos[1] - buttonHeight + posOffset[1], buttonWidth, buttonHeight);

        ctx.fillStyle = "white";
        ctx.fillText(this._text, this._pos[0] - ctx.measureText(this._text).width / 2 + posOffset[0], this._pos[1] - this._defaultFontSize * 0.3 + posOffset[1]);
    }

    _getSize() {
        ctx.font = this._defaultFontSize + "px arial";

        let buttonWidth = ctx.measureText(this._text).width * 1.5;
        let buttonHeight = this._defaultFontSize * 1.3;

        if (buttonWidth < UIButton.getMinWidth())
            buttonWidth = UIButton.getMinWidth();

        return [buttonWidth, buttonHeight];
    }

    _getColor() {
        let r = HUD_COLORS.BUTTON_INACTIVE[0];
        let g = HUD_COLORS.BUTTON_INACTIVE[1];
        let b = HUD_COLORS.BUTTON_INACTIVE[2];

        if (!this.isActive)
            return `rgb(${r},${g},${b})`;

        if (this.isHover) {
            r = HUD_COLORS.BUTTON_HOVER[0] - HUD_COLORS.BUTTON_DEFAULT[0] * (1-this.animationState);
            g = HUD_COLORS.BUTTON_HOVER[1] - HUD_COLORS.BUTTON_DEFAULT[1] * (1-this.animationState);
            b = HUD_COLORS.BUTTON_HOVER[2] - HUD_COLORS.BUTTON_DEFAULT[2] * (1-this.animationState);
        } else {
            r = HUD_COLORS.BUTTON_DEFAULT[0] + HUD_COLORS.BUTTON_HOVER[0] * (1-this.animationState);
            g = HUD_COLORS.BUTTON_DEFAULT[1] + HUD_COLORS.BUTTON_HOVER[1] * (1-this.animationState);
            b = HUD_COLORS.BUTTON_DEFAULT[2] + HUD_COLORS.BUTTON_HOVER[2] * (1-this.animationState);
        }

        return `rgb(${r},${g},${b})`;
    }
}