class Table {
  constructor(row, column) {
    this.row = row;
    this.column = column;
    this.createTable();
  }

  createTable() {
    if (this.flag) {
      return console.log("table already created!!!");
    }
    this.flag = true;
    if (!this.row || !this.column) {
      return console.log("row or column does not null!!!");
    }

    const div = this.createElement({ type: "div", classList: ["content"] });
    this.table = this.createElement({ type: "table", classList: ["table"] });
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
    this.btnRemoveColumn = this.createElement({
      type: "button",
      innerText: "-",
      classList: ["btn", "btn-remove", "btn-remove-column"]
    });
    this.btnRemoveRow = this.createElement({
      type: "button",
      innerText: "-",
      classList: ["btn", "btn-remove", "btn-remove-row"]
    });

    for (let j = 0; j < this.row; j++) {
      let row = this.createRow();
      for (let i = 0; i < this.column; i++) {
        row.appendChild(this.createCell());
      }
      this.table.appendChild(row);
    }

    document.body.appendChild(div);
    div.appendChild(this.table);
    div.appendChild(btnAddColumn);
    div.appendChild(btnAddRow);
    div.appendChild(this.btnRemoveColumn);
    div.appendChild(this.btnRemoveRow);

    /*............Add listeners to html element..........*/
    btnAddRow.addEventListener("click", this.addRow.bind(this));
    btnAddColumn.addEventListener("click", this.addColumn.bind(this));
    this.btnRemoveRow.addEventListener("click", this.removeRow.bind(this));
    this.btnRemoveRow.addEventListener("mouseover", this.showButton.bind(this));
    this.btnRemoveRow.addEventListener("mouseout", this.hiddenButton.bind(this));
    this.btnRemoveColumn.addEventListener("click", this.removeColumn.bind(this));
    this.btnRemoveColumn.addEventListener("mouseover", this.showButton.bind(this));
    this.btnRemoveColumn.addEventListener("mouseout", this.hiddenButton.bind(this));
    this.table.addEventListener("mouseover", this.moveButton.bind(this));
    this.table.addEventListener("mouseover", this.showButton.bind(this));
    this.table.addEventListener("mouseout", this.hiddenButton.bind(this));
  }

  /*......functions for creating HTML elements.......*/
  createElement({ type, classList, innerText }) {
    const element = document.createElement(type);
    element.classList.add(...classList);
    if (innerText) {
      element.innerText = innerText;
    }
    return element;
  }

  createRow() {
    return this.createElement({ type: "tr", classList: ["table-row"] });
  }

  createCell() {
    return this.createElement({ type: "td", classList: ["cell"] });
  }

  /*............functions working with rows and columns.......*/
  addRow() {
    const row = this.createRow();
    for (let i = 0; i < this.column; i++) {
      row.appendChild(this.createCell());
    }
    this.table.appendChild(row);
    this.row++;
  }

  addColumn() {
    const row = this.rowArray();
    row.forEach(row => row.appendChild(this.createCell()));
    this.column++;
  }

  removeRow({ target }) {
    const {
      parentNode: currentRow,
      parentNode: { rowIndex: rowIndex }
    } = this.findCell(target);
    this.table.removeChild(currentRow);
    this.row--;
    if (this.row === rowIndex) {
      this.btnRemoveRow.style.top = `${this.table.lastChild.offsetTop}px`;
    }
    if (this.row === 1) {
      this.btnRemoveRow.classList.remove("btn-show");
    }
  }

  removeColumn({ target }) {
    const { cellIndex } = this.findCell(target);
    const rows = this.rowArray();
    for (let i = 0; i < this.row; i++) {
      rows[i].removeChild(rows[i].children[cellIndex]);
    }
    this.column--;
    if (this.column === cellIndex) {
      this.btnRemoveColumn.style.left = `${rows[0].lastChild.offsetLeft}px`;
    }
    if (this.column === 1) {
      this.btnRemoveColumn.classList.remove("btn-show");
    }
  }

  /*.............Button functions....................*/
  moveButton({ target }) {
    if (this.checkClass(target, "cell")) {
      this.btnRemoveColumn.style.left = `${target.offsetLeft}px`;
      this.btnRemoveRow.style.top = `${target.offsetTop}px`;
    }
  }

  showButton() {
    if (this.column > 1) {
      this.btnRemoveColumn.classList.add("btn-show");
    }
    if (this.row > 1) {
      this.btnRemoveRow.classList.add("btn-show");
    }
  }

  hiddenButton() {
    this.btnRemoveColumn.classList.remove("btn-show");
    this.btnRemoveRow.classList.remove("btn-show");
  }

  /*.........Function to find a cell near the button.....*/
  findCell(target) {
    const { width, height, right, bottom } = target.getBoundingClientRect();
    return document.elementFromPoint(
      this.checkClass(target, "btn-remove-row") ? width + right : right,
      this.checkClass(target, "btn-remove-column") ? height + bottom : bottom
    );
  }

  rowArray() {
    return this.table.querySelectorAll("tr");
  }

  checkClass(element, className) {
    return element.classList.contains(className);
  }
}
