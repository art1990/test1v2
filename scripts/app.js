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
      return this.table.querySelectorAll("tr");
    };

    const getPositionElement = target => {
      return target.getBoundingClientRect();
    };

    const getNumberColumn = () => {
      return getTrArr()[0].querySelectorAll("td").length;
    };

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
      const findTd = () =>
        document.elementFromPoint(
          positionElement().right + positionElement().width,
          positionElement().bottom
        );
      const findTr = () => findTd().parentNode;
      const td = findTd();
      if(td) {
        if(td.classList.contains("cell")){
          const tr = findTr();
          this.table.removeChild(tr);
          this.row--;
          /*
          move the button if it is not opposite the cell
          */
          if (!findTr().classList.contains("table-row")) {
            const lastElem = this.table.lastChild;
            btnRemoveRow.style.top = lastElem.offsetTop.toString() + "px"; 
          }
          if (getTrArr().length === 1) {
            btnRemoveRow.classList.remove("btn-remove-visible");
          }
        } 
      }
          
     
      
    };

    const removeColumn = e => {
      const target = e.target;
      const positionElement = getPositionElement.bind(this, target);
      const findTdFun = () =>
        document.elementFromPoint(
          positionElement().right,
          positionElement().bottom + positionElement().height
        );
      const td = findTdFun();
      if (td) {
        if (td.classList.contains("cell")){
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
          if (getNumberColumn() === 1) {
            btnRemoveColumn.classList.remove("btn-remove-visible");
          }
        }
      }
      
    };

    /*......................Button functions........................*/

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
      /*
      move the delete buttons on the x and y axis
      */
      const target = e.target;
      if (target.classList.contains("cell")) {
        btnRemoveColumn.style.left = target.offsetLeft.toString() + "px";
        btnRemoveRow.style.top = target.offsetTop.toString() + "px";
      }
    };

    const removeBtnVisible = () => {
      /*
      display only if the number of columns> 1;
      */
      if (getNumberColumn() > 1) {
        btnRemoveColumn.classList.add("btn-remove-visible");
      }
      /*
      display only if the number of lines> 1;
      */
      if (getTrArr().length > 1) {
        btnRemoveRow.classList.add("btn-remove-visible");
      }
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
      const moveBtn = moveRemoveBtn.bind(this, btnRemoveColumn, btnRemoveRow);
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

    const removeBtnVisibleListener = elem => {
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

    /*
    to prevent the reuse of the creative function in an instance
    */
    if (this.flag) {
      return console.log("table already created!!!");
    }
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
    /*
    in the code below is the addition of listeners
    */
    addRowListener(btnAddRow);
    addColumnListener(btnAddColumn);
    removeRowListener(btnRemoveRow);
    removeColumnListener(btnRemoveColumn);
    moveRemoveBtnListener(this.table, btnRemoveColumn, btnRemoveRow);
    removeBtnVisibleListener(this.table);
    removeBtnHiddenListener(this.table, btnRemoveColumn, btnRemoveRow);
    removeBtnIsActiveListener(btnRemoveRow);
    removeBtnIsActiveListener(btnRemoveColumn);
    removeBtnIsInActiveListener(btnRemoveColumn, btnRemoveRow);
    removeBtnHiddenListener(btnRemoveColumn, btnRemoveColumn, btnRemoveRow);
    removeBtnHiddenListener(btnRemoveRow, btnRemoveColumn, btnRemoveRow);
  }
}

const a = new Table(5, 5);
