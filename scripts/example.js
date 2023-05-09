window.onload = () => {
    start();

    setInterval(update, 1000 / 60);
}

document.querySelector("canvas").width = 1000;
document.querySelector("canvas").height = 800;

let ticks = 0;

const UIManagerInstance = new UIManager(document.querySelector("canvas"));

function start() {
    /*UIManagerInstance.addElement("ButtonMinus", new UIButton({
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

    UIManagerInstance.addElement("TextInput", new UITextInput({
        manager: UIManagerInstance,
        isActive: true,
        isRender: true,
        pos: [250, 300],
        placeholder: "Test TI",
        maxSymbols: 5,
        value: "123",
    }))*/

    UIManagerInstance.addElement("Container", new UIContainer({
        manager: UIManagerInstance,
        isActive: true,
        isRender: true,
        pos: [50, 50],
        name: "Test Container"
    }))
    UIManagerInstance.getElement("Container").addElement("ButtonMinus", new UIButton({
        manager: UIManagerInstance,
        isActive: true,
        isRender: true,
        onClick: (elem) => {
            
        },
        text: "-1"
    }));

    UIManagerInstance.getElement("Container").addElement("ButtonPlus", new UIButton({
        manager: UIManagerInstance,
        isActive: true,
        isRender: true,
        onClick: (elem) => {

        },
        text: "Test button to test width"
    }));

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

function update() {
    document.querySelector("canvas").getContext("2d").clearRect(0, 0, document.querySelector("canvas").width, document.querySelector("canvas").height);

    UIManagerInstance.update();
    UIManagerInstance.render();
}

let HUD_COLORS = {
    
}