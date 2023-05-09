window.onload = () => {
    start();

    setInterval(update, 1000 / 60);
}

document.querySelector("canvas").width = 1000;
document.querySelector("canvas").height = 800;

const UIManagerInstance = new UIManager(document.querySelector("canvas"));

function start() {
    let container = UIManagerInstance.addElement("Container", new UIContainer({
        manager: UIManagerInstance,
        isActive: true,
        isRender: true,
        pos: [50, 50],
        name: "Test Container"
    }));

    container.addElement("ResetLabel", new UILabel({
        manager: UIManagerInstance,
        isRender: true,
        text: "Reset button:"
    }))

    container.addElement("ResetButton", new UIButton({
        manager: UIManagerInstance,
        isActive: true,
        isRender: true,
        onClick: (elem) => {
            elem.getContainer().getElement("Slider").setValue(0);
            square.speed = 0;
            square.pos = [500, 0]
        },
        text: "Reset"
    }));

    container.addElement("GravityLabel", new UILabel({
        manager: UIManagerInstance,
        isRender: true,
        text: "Gravity slider:"
    }))

    container.addElement("Slider", new UISlider({
        manager: UIManagerInstance,
        isActive: true,
        isRender: true,
        text: "test slider",
        min: -30,
        value: 0,
        max: 30
    }))

    container.addElement("SpaceLabel", new UILabel({
        manager: UIManagerInstance,
        isRender: true,
        text: ""
    }))

    container.addElement("TitleLabels", new UILabel({
        manager: UIManagerInstance,
        isRender: true,
        text: "Square data:"
    }))

    container.addElement("PosLabel", new UILabel({
        manager: UIManagerInstance,
        isRender: true,
        text: ""
    }))

    container.addElement("SpeedLabel", new UILabel({
        manager: UIManagerInstance,
        isRender: true,
        text: ""
    }))

    container.getElement("Slider").onchange = (elem, value) => {
        square.gravity = value;
    }

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
    pos: [500, 0],
    size: [50, 50],
    gravity: 0,
    speed: 0,

    update() {
        this.speed += this.gravity / 120;
        this.pos[1] += this.speed;

        UIManagerInstance.getElement("Container").getElement("PosLabel").setValue("* pos: ["+Math.floor(this.pos[0])+","+Math.floor(this.pos[1])+"]");
        UIManagerInstance.getElement("Container").getElement("SpeedLabel").setValue("* speed: "+Math.floor(this.speed));
    },

    render(ctx) {
        ctx.fillRect(this.pos[0], this.pos[1], this.size[0], this.size[1])
    }
}

function update() {
    document.querySelector("canvas").getContext("2d").clearRect(0, 0, document.querySelector("canvas").width, document.querySelector("canvas").height);

    UIManagerInstance.update();

    document.querySelector("canvas").getContext("2d").fillStyle = "red";
    square.update(UIManagerInstance.getElement("Container").getElement("Slider"));
    square.render(document.querySelector("canvas").getContext("2d"));

    UIManagerInstance.render();
}