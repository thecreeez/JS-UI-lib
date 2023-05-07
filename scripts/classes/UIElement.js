class UIElement {
    constructor( { manager, pos, onHover, onClick, isActive, isRender } ) {
        this._manager = manager;
        this._pos = pos;
        this.onHover = onHover;
        this.onHover = onClick;

        this.isActive = isActive;
        this.isRender = isRender;

        this.isHover = false;
        this.isClicked = false;

        this.animationState = 1;
    }

    render() {

    }

    update() {
        if (this.animationState < 1)
            this.animationState+=0.15;
    }

    checkHover(pos) {
        if (!this.isActive)
            return this.isHover = false;

        if (this.isInCollision(pos)) {
            if (!this.isHover)
                this.animationState = 0;   

            this.isHover = true;
        } else if (this.isHover) {
            this.animationState = 0;
            this.isHover = false;
        }
    }

    checkClick(pos) {
        if (!this.isActive || !this.onclick)
            return false;

        if (this.isInCollision(pos)) {
            this.onclick(this);
            this.isClicked = true;
        }
    }

    isInCollision(pos) {
        if (!this._getSize)
            return false;

        let size = this._getSize();

        if (this._pos[0] - size[0] / 2 > pos[0])
            return false;

        if (this._pos[0] + size[0] / 2 < pos[0])
            return false;

        if (this._pos[1] - size[1] > pos[1])
            return false;

        if (this._pos[1] < pos[1])
            return false;

        return true;
    }

    setActive(state) {
        this.isActive = state;
        this.animationState = 0;
    }

    getManager() {
        return this._manager;
    }

    isSelected() {
        return this == this.getManager().getSelectedUI()
    }
}