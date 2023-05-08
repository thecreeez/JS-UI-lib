window.onload = () => {
    start();

    setInterval(update, 1000 / 60);
}

document.querySelector("canvas").width = 1000;
document.querySelector("canvas").height = 500;

let ticks = 0;

const UIManagerInstance = new UIManager(document.querySelector("canvas"));

function start() {
    UIManagerInstance.addElement("ButtonMinus", new UIButton({
        manager: UIManagerInstance,
        isActive: true,
        isRender: true,
        onClick: (elem) => {
            elem.getManager().getElement("Slider").setValue(elem.getManager().getElement("Slider").getValue() - 1);
        },
        pos: [150, 225],
        text: "-1"
    }))

    UIManagerInstance.addElement("ButtonPlus", new UIButton({
        manager: UIManagerInstance,
        isActive: true,
        isRender: true,
        onClick: (elem) => {
            elem.getManager().getElement("Slider").setValue(elem.getManager().getElement("Slider").getValue() + 1);
        },
        pos: [350,225],
        text: "+1"
    }))

    UIManagerInstance.addElement("Slider", new UISlider({
        manager: UIManagerInstance,
        isActive: true,
        isRender: true,
        pos: [250, 200],
        text: "test slider",
        min: -30,
        value: 0,
        max: 30
    }))

    UIManagerInstance.addElement("SliderHeight", new UISlider({
        manager: UIManagerInstance,
        isActive: false,
        isRender: false,
        pos: [750, 200],
        text: "test slider",
        min: 0,
        value: 0,
        max: document.querySelector("canvas").height
    }))

    UIManagerInstance.addElement("TextInput", new UITextInput({
        manager: UIManagerInstance,
        isActive: true,
        isRender: true,
        pos: [250, 300],
        placeholder: "Test TI",
        maxSymbols: 5,
        value: "123",
    }))

    document.querySelector("canvas").onmousemove = (e) => {
        UIManagerInstance.onmousemove([e.clientX, e.clientY]);
    }

    document.querySelector("canvas").onmousedown = (e) => {
        UIManagerInstance.onmousedown([e.clientX, e.clientY]);
    }

    document.querySelector("canvas").onmouseup = (e) => {
        UIManagerInstance.onmouseup([e.clientX, e.clientY]);
    }

    window.onkeydown = (e) => {
        UIManagerInstance.onkeydown(e.key, e.code)
    }
}

let square = {
    pos: [document.querySelector("canvas").width / 2, 0],
    size: [50,50],

    update(gravity) {
        this.pos[1] += gravity;

        if (this.pos[1] > document.querySelector("canvas").height)
            this.pos[1] = 0;
    },

    render(ctx) {
        ctx.fillRect(this.pos[0], this.pos[1], this.size[0], this.size[1])
    }
}

function update() {
    document.querySelector("canvas").getContext("2d").clearRect(0, 0, document.querySelector("canvas").width, document.querySelector("canvas").height)
    document.querySelector("canvas").getContext("2d").fillStyle = "black";
    document.querySelector("canvas").getContext("2d").fillRect(0, 0, document.querySelector("canvas").width, document.querySelector("canvas").height)

    UIManagerInstance.update();

    //UIManagerInstance.getElement("Slider").setValue(ticks % 9999);

    UIManagerInstance.render();

    document.querySelector("canvas").getContext("2d").fillStyle = "red";
    square.update(UIManagerInstance.getElement("Slider").getValue());
    UIManagerInstance.getElement("SliderHeight").setValue(square.pos[1]);
    square.render(document.querySelector("canvas").getContext("2d"));
}

let HUD_COLORS = {
    
}