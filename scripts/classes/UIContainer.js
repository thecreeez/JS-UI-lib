class UIContainer extends UIElement {
    static DEFAULT_MARGIN_BETWEEN_ELEMENTS = 10;

    static BACKGROUND_COLOR = [0,0,0,0.5];

    static HEADER_COLOR = [0,0,120,0.8];
    static HEADER_HEIGHT = 20;
    static IS_HEADER_ON = false;

    constructor({ manager, pos, isActive, isRender, elements, name }) {
        super({
            manager: manager,
            pos: pos,
            isActive: isActive,
            isRender: isRender,
            onClick: (elem, pos) => {
                elem.getManager().setSelectedElem(elem);
            },
            onHover: (elem, pos) => {
                console.log(elem, pos)
            }
        })
        this._elements = new Map();
        this._name = name;

        if (elements)
            this._elements = elements;
    }

    addElement(id, element) {
        if (this.hasElement(id)) {
            return this.getManager().error("Can't add element. Id is already used.")
        }

        this._elements.set(id, element);
    }

    hasElement(id) {
        if (this._elements.get(id))
            return true;

        return false;
    }

    getElement(id) {
        return this._elements.get(id);
    }

    render({ctx, pos}) {
        let renderingPos = [this._pos[0], this._pos[1]];

        if (pos) {
            renderingPos = [pos[0], pos[1]];
        }

        this._renderContainer(ctx, renderingPos);
        this._renderElements(ctx, renderingPos);
    }

    _renderContainer(ctx, renderingPos) {
        let size = this._getSize(ctx);

        if (UIContainer.IS_HEADER_ON) {
            this.getManager().setFillColor(this.getHeaderColor())
            ctx.fillRect(renderingPos[0], renderingPos[1], size[0] - UIContainer.HEADER_HEIGHT, UIContainer.HEADER_HEIGHT);

            this.getManager().setFillColor("red");
            ctx.fillRect(renderingPos[0] + size[0] - UIContainer.HEADER_HEIGHT, renderingPos[1], UIContainer.HEADER_HEIGHT, UIContainer.HEADER_HEIGHT);
        }

        this.getManager().setFillColor(this.getBackgroundColor())
        ctx.fillRect(renderingPos[0], renderingPos[1], size[0], size[1] + UIContainer.DEFAULT_MARGIN_BETWEEN_ELEMENTS);
    }

    _renderElements(ctx, renderingPos) {
        let yElements = UIContainer.DEFAULT_MARGIN_BETWEEN_ELEMENTS;

        if (UIContainer.IS_HEADER_ON) {
            yElements += UIContainer.HEADER_HEIGHT;
        }

        this._elements.forEach((element) => {
            let size = element._getSize(ctx);
            let elementPos = [renderingPos[0], renderingPos[1]];

            elementPos[0] += UIContainer.DEFAULT_MARGIN_BETWEEN_ELEMENTS + size[0] / 2;
            elementPos[1] += yElements + size[1];

            element.render({
                ctx,
                pos: elementPos
            });

            yElements += element._getSize(ctx)[1] + UIContainer.DEFAULT_MARGIN_BETWEEN_ELEMENTS;
        })
    }

    checkHover(pos, ctx) {
        if (this.isSelected()) {

            // HEADER ACTIONS
            if (this._pos[1] < pos[1] && UIContainer.IS_HEADER_ON && this._pos[1] + UIContainer.HEADER_HEIGHT > pos[1]) {
                this.hoverMove(pos)
                return;
            }
            
            // ELEMENTS CHECK

        }
    }

    hoverMove(pos) {
        if (this.getManager().mousePos) {
            let delta = [pos[0] - this.getManager().mousePos[0], pos[1] - this.getManager().mousePos[1]];

            this._pos[0] += delta[0];
            this._pos[1] += delta[1];
        }
    }

    _getSize(ctx) {
        let size = this.getElementsSize(ctx);

        let width = Math.max(...size[0]);
        let height = size[1].reduce((a, b) => a + b);

        height += UIContainer.HEADER_HEIGHT;

        return [width, height];
    }

    getElementsSize(ctx) {
        let widths = [];
        let heights = [];

        for (let element of this._elements) {
            let size = element[1]._getSize(ctx);

            widths.push(size[0] + UIContainer.DEFAULT_MARGIN_BETWEEN_ELEMENTS * 2);
            heights.push(size[1] + UIContainer.DEFAULT_MARGIN_BETWEEN_ELEMENTS)
        }

        return [widths, heights];
    }

    getBackgroundColor() {
        return `rgb(${UIContainer.BACKGROUND_COLOR[0]},${UIContainer.BACKGROUND_COLOR[1]},${UIContainer.BACKGROUND_COLOR[2]},${UIContainer.BACKGROUND_COLOR[3]})`
    }

    getHeaderColor() {
        return `rgb(${UIContainer.HEADER_COLOR[0]},${UIContainer.HEADER_COLOR[1]},${UIContainer.HEADER_COLOR[2]},${UIContainer.HEADER_COLOR[3]})`
    }

    update(deltaTime) {
        super.update(deltaTime);

        if (!this.isClicked && this.isSelected())
            this.getManager().setSelectedElem(null)
    }

    isInCollision(pos, ctx) {
        let size = this._getSize(ctx);

        if (this._pos[0] > pos[0])
            return false;

        if (this._pos[0] + size[0] < pos[0])
            return false;

        if (this._pos[1] > pos[1])
            return false;

        if (this._pos[1] + size[1] < pos[1])
            return false;

        return true;
    }

    getElementByLocalPos(pos, ctx) {
        
    }
}