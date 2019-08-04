class Table {
  constructor(row, column) {
    this.row = row;
    this.column = column;
    this.table = document.createElement("table");
    this.createTable();
  }

  createTable() {
    const getArr = () => {
      const tr = this.table.querySelectorAll("tr");
      return tr;
    };
    const getPositionElement = target => {
      target.getBoundingClientRect();
    };

    if (this.flag) {
      return null;
    } // для предотвращения повторного использывания createtable а екземпляре
    this.flag = true;
    //Create tag function.............................................
    const createTrElement = () => {
      let tr = document.createElement("tr");
      tr.classList.add("table-row");
      return tr;
    };
    const createTdElement = () => {
      let td = document.createElement("td");
      td.classList.add("cell");
      return td;
    };

    //Work with rows and columns.........................

    const addRow = () => {
      let tr = createTrElement();
      for (let i = 0; i < this.column; i++) {
        let td = createTdElement();
        tr.appendChild(td);
      }
      this.table.appendChild(tr);
      this.row++;
      if (getArr().length === 2) {
        btnRemoveRow.classList.add("btn-remove-visible");
      }
    };

    const addColumn = () => {
      for (let i = 0; i < this.row; i++) {
        let td = createTdElement();
        let tr = getArr()[i];
        tr.appendChild(td);
      }
      this.column++;
    };

    const removeRow = e => {
      const target = e.target;
      const positionXYFun = () => target.getBoundingClientRect();
      const trFun = () =>
        document.elementFromPoint(
          positionXYFun().right + positionXYFun().width,
          positionXYFun().bottom
        ).parentNode;

      const tr = trFun();
      this.table.removeChild(tr);
      this.row--;
      if (getArr().length === 1) {
        btnRemoveRow.classList.remove("btn-remove-visible");
        return;
      }
      if (!trFun().classList.contains("table-row")) {
        const lastchild = this.table.lastChild;
        btnRemoveRow.style.top = lastchild.offsetTop.toString() + "px";
      }
    };

    const removeColumn = e => {
      const positionXY = e.target.getBoundingClientRect();
      const tdFun = () =>
        document.elementFromPoint(
          positionXY.right,
          positionXY.bottom + positionXY.height
        );
      const td = tdFun();
      if (td.classList.contains("btn")) {
        return;
      }
      const tdNum = [...td.parentElement.children].indexOf(td);
      const allTr = getArr();
      for (let i = 0; i < this.row; i++) {
        let removeTd = allTr[i].children[tdNum];
        allTr[i].removeChild(removeTd);
      }
      this.column--;
      if (
        getArr()[0].querySelectorAll("td")
          .length === 1
      ) {
        btnRemoveColumn.classList.remove("btn-remove-visible");
        return;
      }
      if (!tdFun().classList.contains("cell")) {
        const lastchild = getArr()[0]
          .lastChild;
        btnRemoveColumn.style.left = lastchild.offsetLeft.toString() + "px";
      }
    };

    //button function....................................

    const createBtn = () => {
      const btn = document.createElement("button");
      btn.classList.add("btn");
      return btn;
    };
    const createAddBtn = () => {
      const addBtn = createBtn();
      addBtn.classList.add("btn-add");
      addBtn.innerText = "+";
      return addBtn;
    };

    const createRemoveBtn = () => {
      const removeBtn = createBtn();
      removeBtn.classList.add("btn-remove");
      removeBtn.innerText = "-";
      return removeBtn;
    };

    const moveRemoveBtnFunction = (btnRemoveColumn, btnRemoveRow, e) => {
      const target = e.target;
      if (target.classList.contains("cell")) {
        btnRemoveColumn.style.left = target.offsetLeft.toString() + "px";
        btnRemoveRow.style.top = target.offsetTop.toString() + "px";
      }
    };

    const removeBtnVisible = () => {
      btnRemoveColumn.classList.add("btn-remove-visible");
      btnRemoveRow.classList.add("btn-remove-visible");
    };

    const removeBtnHidden = (...arg) => {
      try {
        for (let i in arg) {
          arg[i].classList.remove("btn-remove-visible");
        }
      } catch (e) {}
    };

    //Listeners..........................................

    const moveRemoveBtnListener = (elem, btnRemoveColumn, btnRemoveRow) => {
      const moveBtn = moveRemoveBtnFunction.bind(
        this,
        btnRemoveColumn,
        btnRemoveRow
      ); //привязка контекста ивент к функции
      elem.addEventListener("mouseover", moveBtn);
    };

    const addRowListener = btn => {
      btn.addEventListener("click", addRow);
    };
    const addColumnListener = btn => {
      btn.addEventListener("click", addColumn);
    };

    const removeRowListener = btn => {
      const removeRowFunction = removeRow.bind(this);
      btn.addEventListener("click", removeRowFunction);
    };
    const removeColumnListener = btn => {
      const removeColumnFunction = removeColumn.bind(this);
      btn.addEventListener("click", removeColumnFunction);
    };

    const removeBtnVisibleListener = () => {
      this.table.addEventListener("mouseover", removeBtnVisible);
    };
    const removeBtnHiddenListener = (...arg) => {
      const a = removeBtnHidden.bind(this, ...arg);
      this.table.addEventListener("mouseout", a);
    };

    const removeBtnIsActiveListener = btn => {
      btn.addEventListener("mouseover", removeBtnVisible);
    };

    const removeBtnIsInActiveListener = (btn1, btn2) => {
      const btnHidden = removeBtnHidden.bind(this, btn1, btn2);
      btn1.addEventListener("mouseout", btnHidden);
      btn2.addEventListener("mouseout", btnHidden);
    };

    if (!this.row && !this.column) {
      return null;
    }
    const div = document.createElement("div");
    const btnAddColumn = createAddBtn();
    const btnAddRow = createAddBtn();
    const btnRemoveColumn = createRemoveBtn();
    const btnRemoveRow = createRemoveBtn();
    btnAddColumn.classList.add("btn-add-column");
    btnAddRow.classList.add("btn-add-row");
    addRowListener(btnAddRow);
    addColumnListener(btnAddColumn);
    removeRowListener(btnRemoveRow);
    removeColumnListener(btnRemoveColumn);
    moveRemoveBtnListener(this.table, btnRemoveColumn, btnRemoveRow); //добавление слушателя перемещение кнопок
    removeBtnVisibleListener();
    removeBtnHiddenListener(btnRemoveColumn, btnRemoveRow);
    removeBtnIsActiveListener(btnRemoveRow);
    removeBtnIsActiveListener(btnRemoveColumn);
    removeBtnIsInActiveListener(btnRemoveColumn, btnRemoveRow)
    btnRemoveColumn.classList.add("btn-remove-column");
    btnRemoveRow.classList.add("btn-remove-row");
    for (let j = 0; j < this.row; j++) {
      let tr = createTrElement();
      for (let i = 0; i < this.column; i++) {
        let td = createTdElement();
        tr.appendChild(td);
      }
      this.table.appendChild(tr);
    }
    this.table.classList.add("table");
    div.appendChild(this.table);
    div.classList.add("content");
    document.body.appendChild(div);
    div.appendChild(btnAddColumn);
    div.appendChild(btnAddRow);
    div.appendChild(btnRemoveColumn);
    div.appendChild(btnRemoveRow);
  }
}

const a = new Table(5, 5);
// const b = new Table(5,5)
