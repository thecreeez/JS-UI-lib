class UIManager {

    static ButtonMinWidth = 200;
    static SliderMinWidth = 200;
    static TextInputMinWidth = 200;

    static font = "arial";
    static fontSize = 15;

    constructor() {
        this._elements = new Map();
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

    }

    update() {

    }

    error(message) {
        console.error("UIManager",message);
    }
}