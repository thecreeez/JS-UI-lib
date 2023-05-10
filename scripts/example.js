window.onload = () => {
    start();

    setInterval(update, 1000 / 60);
}

document.querySelector("canvas").width = 1000;
document.querySelector("canvas").height = 800;

const UIManagerInstance = new UIManager(document.querySelector("canvas"));

function start() {

    let BasicContainer = UIManagerInstance.addElement("BasicContainer", new UIContainer({
        manager: UIManagerInstance,
        pos: [0,0],
        isActive: true,
        isRender: true,
        name: "Containers Generator"
    }));

    BasicContainer.addElement("TextInputName", new UITextInput({
        manager: UIManagerInstance,
        isActive: true,
        isRender: true,
        placeholder: "Имя контейнера",
        maxSymbols: 10
    }))

    BasicContainer.addElement("ButtonCreate", new UIButton({
        manager: UIManagerInstance,
        isActive: true,
        isRender: true,
        text: "Создать",
        onClick: (elem, pos) => {
            let name = elem.getContainer().getElement("TextInputName").getValue();

            if (name.length < 1) {
                elem.getContainer().getElement("LabelStatus").setValue("Status: Недоступное имя.")
                return;
            }

            if (elem.getManager().hasElement(name)) {
                elem.getContainer().getElement("LabelStatus").setValue("Status: Имя занято.")
                return;
            }

            elem.getManager().addElement(name, new UIContainer({
                manager: UIManagerInstance,
                pos: [0,0],
                isActive: true,
                isRender: true,
                name: name
            }));
        }
    }))

    BasicContainer.addElement("ButtonRemove", new UIButton({
        manager: UIManagerInstance,
        isActive: true,
        isRender: true,
        text: "Удалить",
        onClick: (elem, pos) => {
            let name = elem.getContainer().getElement("TextInputName").getValue();

            if (name.length < 1) {
                elem.getContainer().getElement("LabelStatus").setValue("Status: Недоступное имя.")
                return;
            }

            if (!elem.getManager().hasElement(name)) {
                elem.getContainer().getElement("LabelStatus").setValue("Status: Имя не существует")
                return;
            }

            elem.getManager().removeElement(name);
        }
    }))


    BasicContainer.addElement("LabelStatus", new UILabel({
        manager: UIManagerInstance,
        isActive: true,
        isRender: true,
        text: "Status:"
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


function update() {
    document.querySelector("canvas").getContext("2d").clearRect(0, 0, document.querySelector("canvas").width, document.querySelector("canvas").height);

    UIManagerInstance.update();
    UIManagerInstance.render();
}