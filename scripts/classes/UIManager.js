class UIManager {

    static ButtonMinWidth = 200;
    static SliderMinWidth = 200;
    static TextInputMinWidth = 200;

    static font = "arial";
    static fontSize = 15;

    constructor(canvas) {
        this._elements = new Map();

        this._canvas = canvas;
        this._ctx = canvas.getContext("2d");

        this._lastUpdate = Date.now();
    }

    addElement(id, element) {
        if (this.hasElement(id)) {
            return this.error("Can't add element. Id is already used.")
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

    render() {
        for (let element of this._elements) {
            element.render(this._canvas, this._ctx);
        }
    }

    update() {
        let deltaTime = Date.now() - this._lastUpdate;

        for (let element of this._elements) {
            element.update(deltaTime);
        }
    }

    error(message) {
        console.error("UIManager",message);
    }
}