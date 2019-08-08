class Table {
  constructor(row, column) {
    this.currentRow = row;
    this.currentColumn = column;
    this.createTable();
  }

  createElement ({ type, classList, innerText }) {
    const element = document.createElement(type);
    element.classList.add(...classList);
    if (innerText) {
      element.innerText = innerText;
    }
    return element;
  };

  createTable() {
    if (this.flag) {
      return console.log("table already created!!!");
    }
    this.flag = true;
    if (!this.currentRow || !this.currentColumn) {
      return console.log("row or column does not null!!!");
    }

    const div = this.createElement({ type: "div", classList: ["content"] });
    const table = this.createElement({ type: "table", classList: ["table"] });
    const createRowContainer = () =>
    this.createElement({ type: "tr", classList: ["table-row"] });
    const createCell = () => this.createElement({ type: "td", classList: ["cell"] });

    const getRows = () => table.querySelectorAll("tr");
    const checkClass = (element, className) => element.classList.contains(className);

    /*......................Work with rows and columns........................*/

    const findCell = target => {
      const {width, height, right, bottom} = target.getBoundingClientRect();
      return document.elementFromPoint(
        checkClass(target, "btn-remove-row")?width + right: right,
        checkClass(target, "btn-remove-column")? height + bottom: bottom
      );
    };

    const addRow = () => {
      const row = createRowContainer();
      for (let i = 0; i < this.currentColumn; i++) {
        row.appendChild(createCell());
      }
      table.appendChild(row);
      this.currentRow++;
    };

    const addColumn = () => {
      /*const rows = getRows();*/
      getRows().forEach((row) => {
        row.appendChild(createCell())
      });
      /*for (let i = 0; i < this.currentRow; i++) {
        rows[i].appendChild(createCell());
      }*/
      this.currentColumn++;
    };

    const removeRow = ({target}) => {
      const currentCell = findCell(target);
      table.removeChild(currentCell.parentNode);
      this.currentRow--;
      if (!checkClass(findCell(target), "cell")) {
        btnRemoveRow.style.top = `${table.lastChild.offsetTop}px`;
      }
      if (this.currentRow === 1) {
        btnRemoveRow.classList.remove("btn-show");
      }
    };

    const removeColumn = ({target}) => {
      const currentCell = findCell(target);
      const indexCell = [...currentCell.parentNode.children].indexOf(currentCell);
      const rows = getRows();
      rows.forEach((row, i, rows) => {
        rows[i].removeChild(row.children[indexCell])
      });
      /*for (let i = 0; i < this.currentRow; i++) {
        rows[i].removeChild(rows[i].children[indexCell]);
      }*/
      this.currentColumn--;
      if (this.currentColumn === indexCell) {
        btnRemoveColumn.style.left = `${rows[0].lastChild.offsetLeft}px`;
      }
      if (this.currentColumn === 1) {
        btnRemoveColumn.classList.remove("btn-show");
      }
    };

    /*......................Button functions........................*/

    const moveButton = ({target}) => {
      if (checkClass(target, "cell")) {
        btnRemoveColumn.style.left = `${target.offsetLeft}px`;
        btnRemoveRow.style.top = `${target.offsetTop}px`;
      }
    };

    const showButton = () => {
      if (this.currentColumn > 1) {
        btnRemoveColumn.classList.add("btn-show");
      }
      if (this.currentRow > 1) {
        btnRemoveRow.classList.add("btn-show");
      }
    };

    const hiddenButton = () => {
      btnRemoveColumn.classList.remove("btn-show");
      btnRemoveRow.classList.remove("btn-show");
    };

    /*......................Table creation........................*/

   


    const btnAddColumn = this.createElement({
      type: "button",
      innerText: "+",
      classList: ["btn", "btn-add", "btn-add-column"]
    });
    const btnAddRow = this.createElement({
      type: "button",
      innerText: "+",
      classList: ["btn", "btn-add", "btn-add-row"]
    });
    const btnRemoveColumn = this.createElement({
      type: "button",
      innerText: "-",
      classList: ["btn", "btn-remove", "btn-remove-column"]
    });
    const btnRemoveRow = this.createElement({
      type: "button",
      innerText: "-",
      classList: ["btn", "btn-remove", "btn-remove-row"]
    });

    for (let j = 0; j < this.currentRow; j++) {
      let row = createRowContainer();
      for (let i = 0; i < this.currentColumn; i++) {
        row.appendChild(createCell());
      }
      table.appendChild(row);
    }
    document.body.appendChild(div);
    div.appendChild(table);
    div.appendChild(btnAddColumn);
    div.appendChild(btnAddRow);
    div.appendChild(btnRemoveColumn);
    div.appendChild(btnRemoveRow);
    btnAddRow.addEventListener("click", addRow);
    btnAddColumn.addEventListener("click", addColumn);
    btnRemoveRow.addEventListener("click", removeRow);
    btnRemoveRow.addEventListener("mouseover", showButton);
    btnRemoveRow.addEventListener("mouseout", hiddenButton);
    btnRemoveColumn.addEventListener("click", removeColumn);
    btnRemoveColumn.addEventListener("mouseover", showButton);
    btnRemoveColumn.addEventListener("mouseout", hiddenButton);
    table.addEventListener("mouseover", moveButton);
    table.addEventListener("mouseover", showButton);
    table.addEventListener("mouseout", hiddenButton);
  }
}

const a = new Table(5, 5);
