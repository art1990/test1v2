class Table {
  constructor(row, column) {
    this.row = row;
    this.column = column;
    this.table = document.createElement("table");
    this.createTable();
  }

  createTable() {
    

    /*......................Get function........................*/
    const getTrArr = () => {
      const tr = this.table.querySelectorAll("tr");
      return tr;
    };
    const getPositionElement = target => {
      const element = target.getBoundingClientRect();
      return element
    };

    const getNumberColumn = () => {
      const td = getTrArr()[0].querySelectorAll("td").length
      return td
    }
   
    /*......................Create tag function........................*/
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

    /*......................Work with rows and columns........................*/

    const addRow = () => {
      let tr = createTrElement();
      for (let i = 0; i < this.column; i++) {
        let td = createTdElement();
        tr.appendChild(td);
      }
      this.table.appendChild(tr);
      this.row++;
    };

    const addColumn = () => {
      for (let i = 0; i < this.row; i++) {
        let td = createTdElement();
        let tr = getTrArr()[i];
        tr.appendChild(td);
      }
      this.column++;
    };

    const removeRow = e => {
      const target = e.target;
      const positionElement = getPositionElement.bind(this, target);
      const findTrFun = () =>
        document.elementFromPoint(
          positionElement().right + positionElement().width,
          positionElement().top
        ).parentNode;

      const tr = findTrFun();
      this.table.removeChild(tr);
      this.row--;
    
      if (!findTrFun().classList.contains("table-row")) {
        const lastElem = this.table.lastChild;
        btnRemoveRow.style.top = lastElem.offsetTop.toString() + "px";
        
      }
      if (getTrArr().length === 1) {
        btnRemoveRow.classList.remove("btn-remove-visible");
        return;
      }
    };

    const removeColumn = e => {
      const target = e.target
      const positionElemen = getPositionElement.bind(this, target);
      const findTdFun = () =>
        document.elementFromPoint(
          positionElemen().right,
          positionElemen().bottom + positionElemen().height
        );
      const td = findTdFun();
      if (td.classList.contains("btn")) {
        return;
      }
      const tdNum = [...td.parentElement.children].indexOf(td);
      const allTr = getTrArr();
      for (let i = 0; i < this.row; i++) {
        let removeTd = allTr[i].children[tdNum];
        allTr[i].removeChild(removeTd);
      }
      this.column--;
      
      if (!findTdFun().classList.contains("cell")) {
        const lastElem = getTrArr()[0].lastChild;
        btnRemoveColumn.style.left = lastElem.offsetLeft.toString() + "px";
      }

      if (
        getNumberColumn() === 1
    ) {
      btnRemoveColumn.classList.remove("btn-remove-visible");
      return;
    }
    };

    /*......................Buttom functions........................*/

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

    const moveRemoveBtn = (btnRemoveColumn, btnRemoveRow, e) => {
      const target = e.target;
      if (target.classList.contains("cell")) {
        btnRemoveColumn.style.left = target.offsetLeft.toString() + "px";
        btnRemoveRow.style.top = target.offsetTop.toString() + "px";
      }
    };

    const removeBtnVisible = () => {
      if (getNumberColumn() > 1) {
      btnRemoveColumn.classList.add("btn-remove-visible");}
      if (getTrArr().length > 1) {
      btnRemoveRow.classList.add("btn-remove-visible");} //отображать только если число строк > 1;
    };

    const removeBtnHidden = (...arg) => {
      try {
        for (let i in arg) {
          arg[i].classList.remove("btn-remove-visible");
        }
      } catch (e) {}
    };

    /*......................Listeners........................*/

    const moveRemoveBtnListener = (elem, btnRemoveColumn, btnRemoveRow) => {
      const moveBtn = moveRemoveBtn.bind(
        this,
        btnRemoveColumn,
        btnRemoveRow
      ); //привязка контекста event.target к функции
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

    const removeBtnVisibleListener = (elem) => {
      elem.addEventListener("mouseover", removeBtnVisible);
    };
    const removeBtnHiddenListener = (elem, ...arg) => {
      const btnHidden = removeBtnHidden.bind(this, ...arg);
      elem.addEventListener("mouseout", btnHidden);
    };

    const removeBtnIsActiveListener = btn => {
      btn.addEventListener("mouseover", removeBtnVisible);
    };

    const removeBtnIsInActiveListener = (btn1, btn2) => {
      const btnHidden = removeBtnHidden.bind(this, btn1, btn2);
      btn1.addEventListener("mouseout", btnHidden);
      btn2.addEventListener("mouseout", btnHidden);
    };


    /*......................Table creation........................*/

    if (this.flag) {
      return null;
    } // для предотвращения повторного использывания createtable а екземпляре
    this.flag = true;

    if (!this.row || !this.column) {
      return null;
    }
    const div = document.createElement("div");
    const btnAddColumn = createAddBtn();
    const btnAddRow = createAddBtn();
    const btnRemoveColumn = createRemoveBtn();
    const btnRemoveRow = createRemoveBtn();
    btnAddColumn.classList.add("btn-add-column");
    btnAddRow.classList.add("btn-add-row");
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
    addRowListener(btnAddRow);
    addColumnListener(btnAddColumn);
    removeRowListener(btnRemoveRow);
    removeColumnListener(btnRemoveColumn);
    moveRemoveBtnListener(this.table, btnRemoveColumn, btnRemoveRow); //добавление слушателя перемещение кнопок
    removeBtnVisibleListener(this.table);//отображение кнопок удаления при наведении на таблицу
    removeBtnHiddenListener(this.table, btnRemoveColumn, btnRemoveRow);
    removeBtnIsActiveListener(btnRemoveRow);
    removeBtnIsActiveListener(btnRemoveColumn);
    removeBtnIsInActiveListener(btnRemoveColumn, btnRemoveRow)
    removeBtnHiddenListener(btnRemoveColumn, btnRemoveColumn, btnRemoveRow);// если убрать мыш с removecolumn кнопка исчезает
    removeBtnHiddenListener(btnRemoveRow, btnRemoveColumn, btnRemoveRow);// если убрать мыш с removerow кнопка исчезает
  }

  
}

const a = new Table(5, 5);



