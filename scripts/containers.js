function getMainMenu() {
    let menuContainer = new UIContainer({
        manager: UIManagerInstance,
        pos: [0, 0],
        isActive: true,
        isRender: true,
        name: "MainMenu"
    })

    menuContainer.addElement("ButtonContainers", new UIButton({
        manager: UIManagerInstance,
        isActive: true,
        isRender: true,
        text: "Show ContainersMenu",
        onClick: (elem, pos) => {
            if (elem.getManager().hasElement("MenuContainers")) {
                elem.getManager().removeElement("MenuContainers");
                elem.setText("Show ContainersMenu")
            } else {
                elem.getManager().addElement("MenuContainers", getContainersMenu());
                elem.setText("Hide ContainersMenu");
            }
        }
    }));

    menuContainer.addElement("ButtonLabels", new UIButton({
        manager: UIManagerInstance,
        isActive: true,
        isRender: true,
        text: "Show LabelsMenu",
        onClick: (elem, pos) => {
            if (elem.getManager().hasElement("MenuLabels")) {
                elem.getManager().removeElement("MenuLabels");
                elem.setText("Show LabelsMenu")
            } else {
                elem.getManager().addElement("MenuLabels", getLabelMenu());
                elem.setText("Hide LabelsMenu");
            }
        }
    }));

    return menuContainer;
}

function getContainersMenu() {
    let menuContainer = new UIContainer({
        manager: UIManagerInstance,
        pos: [0, 400],
        isActive: true,
        isRender: true,
        name: "ContainersMenu"
    })

    menuContainer.addElement("TextInputName", new UITextInput({
        manager: UIManagerInstance,
        isActive: true,
        isRender: true,
        placeholder: "Имя контейнера",
        maxSymbols: 20
    }))

    menuContainer.addElement("ButtonCreate", new UIButton({
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
                pos: [0, 0],
                isActive: true,
                isRender: true,
                name: name
            }));
            elem.getContainer().getElement("LabelStatus").setValue("Status: Created.")
        }
    }))

    menuContainer.addElement("ButtonDelete", new UIButton({
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
                elem.getContainer().getElement("LabelStatus").setValue("Status: Не существует.")
                return;
            }


            elem.getManager().removeElement(name);
            elem.getContainer().getElement("LabelStatus").setValue("Status: Deleted.")
        }
    }))

    menuContainer.addElement("LabelStatus", new UILabel({
        manager: UIManagerInstance,
        isActive: true,
        isRender: true,
        text: "Status: Waiting."
    }))

    return menuContainer;
}

function getLabelMenu() {
    let menuContainer = new UIContainer({
        manager: UIManagerInstance,
        pos: [0, 400],
        isActive: true,
        isRender: true,
        name: "LabelMenu"
    })

    menuContainer.addElement("TextInputContainer", new UITextInput({
        manager: UIManagerInstance,
        isActive: true,
        isRender: true,
        placeholder: "Имя контейнера",
        maxSymbols: 20
    }))

    menuContainer.addElement("Space1", new UILabel({
        manager: UIManagerInstance,
        isActive: true,
        isRender: true,
        text: ""
    }))

    menuContainer.addElement("Label1", new UILabel({
        manager: UIManagerInstance,
        isActive: true,
        isRender: true,
        text: "Label data:"
    }))

    menuContainer.addElement("TextInputFieldId", new UITextInput({
        manager: UIManagerInstance,
        isActive: true,
        isRender: true,
        placeholder: "Id",
        maxSymbols: 20
    }))

    menuContainer.addElement("TextInputFieldText", new UITextInput({
        manager: UIManagerInstance,
        isActive: true,
        isRender: true,
        placeholder: "Text",
        maxSymbols: 20
    }))

    menuContainer.addElement("ButtonCreate", new UIButton({
        manager: UIManagerInstance,
        isActive: true,
        isRender: true,
        text: "Создать",
        onClick: (elem, pos) => {
            let containerId = elem.getContainer().getElement("TextInputContainer").getValue();

            let labelId = elem.getContainer().getElement("TextInputFieldId").getValue();
            let text = elem.getContainer().getElement("TextInputFieldText").getValue();

            if (labelId.length < 1) {
                elem.getContainer().getElement("LabelStatus").setValue("Status: LabelId empty.")
                return;
            }

            if (text.length < 1) {
                elem.getContainer().getElement("LabelStatus").setValue("Status: Text empty.")
                return;
            }

            if (containerId.length < 1) {
                elem.getContainer().getElement("LabelStatus").setValue("Status: Недоступное имя.")
                return;
            }

            if (!elem.getManager().hasElement(containerId)) {
                elem.getContainer().getElement("LabelStatus").setValue("Status: Контейнер не найден")
                return;
            }

            if (elem.getManager().getElement(containerId).hasElement(labelId)) {
                elem.getContainer().getElement("LabelStatus").setValue("Status: Id занято.")
                return;
            }

            let container = elem.getManager().getElement(containerId);

            container.addElement(labelId, new UILabel({
                manager: UIManagerInstance,
                isRender: true,
                text: text
            }))
            elem.getContainer().getElement("LabelStatus").setValue("Status: Created.")
        }
    }))

    menuContainer.addElement("ButtonDelete", new UIButton({
        manager: UIManagerInstance,
        isActive: true,
        isRender: true,
        text: "Удалить",
        onClick: (elem, pos) => {
            let containerId = elem.getContainer().getElement("TextInputContainer").getValue();

            let labelId = elem.getContainer().getElement("TextInputFieldId").getValue();

            if (labelId.length < 1) {
                elem.getContainer().getElement("LabelStatus").setValue("Status: LabelId empty.")
                return;
            }

            if (containerId.length < 1) {
                elem.getContainer().getElement("LabelStatus").setValue("Status: Недоступное имя.")
                return;
            }

            if (!elem.getManager().hasElement(containerId)) {
                elem.getContainer().getElement("LabelStatus").setValue("Status: Контейнер не найден")
                return;
            }

            if (!elem.getManager().getElement(containerId).hasElement(labelId)) {
                elem.getContainer().getElement("LabelStatus").setValue("Status: Id не занято.")
                return;
            }

            let container = elem.getManager().getElement(containerId);

            container.removeElement(labelId)
            elem.getContainer().getElement("LabelStatus").setValue("Status: Removed.")
        }
    }))

    menuContainer.addElement("LabelStatus", new UILabel({
        manager: UIManagerInstance,
        isActive: true,
        isRender: true,
        text: "Status: Waiting."
    }))

    return menuContainer;
}