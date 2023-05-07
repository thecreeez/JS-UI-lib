window.onload = () => {
    start();

    setInterval(update, 1000 / 60);
}

document.querySelector("canvas").width = document.width;
document.querySelector("canvas").height = document.height;

const UIManagerInstance = new UIManager(document.querySelector("canvas"));

function start() {
    UIManagerInstance.addElement("Button", new UIButton())
}

function update() {

}