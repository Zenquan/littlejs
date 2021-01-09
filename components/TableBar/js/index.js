let tabSwitch = function (id, oBtn) {
    let oDiv = document.getElementById(id);
    this.aBtn = oDiv.getElementsByTagName('input');
    this.aDiv = oDiv.getElementsByTagName('div');
    for (var i = 0; i < this.aBtn.length; i++) {
        this.aBtn[i].className = '';
        this.aDiv[i].style.display = 'none';
    }
    oBtn.className = 'active';
    this.aDiv[oBtn.index].style.display = 'block';
}

var ex = new little();
//there is a bug
ex.attribute('div1', 'input', 'div', tabSwitch('div1', this));
