window.onload = () => {
    start();

    setInterval(update, 1000 / 60);
}

document.querySelector("canvas").width = 1000;
document.querySelector("canvas").height = 500;

let ticks = 0;

const UIManagerInstance = new UIManager(document.querySelector("canvas"));

function start() {
    UIManagerInstance.addElement("Button", new UIButton({
        manager: UIManagerInstance,
        isActive: true,
        isRender: true,
        onClick: (elem) => {
            console.log(123);
        },
        pos: [250,100],
        text: "test button"
    }))

    UIManagerInstance.addElement("Slider", new UISlider({
        manager: UIManagerInstance,
        isActive: true,
        isRender: true,
        pos: [250, 200],
        text: "test slider",
        min: 0,
        value: 0,
        max: 9999
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
}

function update() {
    document.querySelector("canvas").getContext("2d").clearRect(0, 0, document.querySelector("canvas").width, document.querySelector("canvas").height)
    document.querySelector("canvas").getContext("2d").fillStyle = "black";
    document.querySelector("canvas").getContext("2d").fillRect(0, 0, document.querySelector("canvas").width, document.querySelector("canvas").height)

    UIManagerInstance.update();

    UIManagerInstance.getElement("Slider").setValue(ticks % 9999);

    UIManagerInstance.render();

    ticks++;
}

let HUD_COLORS = {
    TEXTINPUT_BACKGROUND: [200, 200, 200],
    TEXTINPUT_HOVER_STROKE: [0, 51, 204],
}