class Table {
  constructor(row, column) {
    this.row = row;
    this.column = column;
    this.createTable();
  }

  createTable() {
    /*......................Get function........................*/

    const getRows = () => {
      return table.querySelectorAll("tr");
    };

    /*......................Create tag function........................*/

    const createElement = ({ type, classList, innerText }) => {
      const element = document.createElement(type);
      element.classList.add(...classList);
      if (innerText) {
        element.innerText = innerText;
      }
      return element;
    };

    const createRow = () =>
      createElement({ type: "tr", classList: ["table-row"] });
    const createCell = () => createElement({ type: "td", classList: ["cell"] });
    const table = createElement({ type: "table", classList: ["table"] });

    /*......................Work with rows and columns........................*/

    const findCell = target => {
      const element = target.getBoundingClientRect();
      return document.elementFromPoint(
        target.classList.contains("btn-remove-row")
          ? element.width + element.right
          : element.right,
        target.classList.contains("btn-remove-column")
          ? element.height + element.bottom
          : element.bottom
      );
    };

    const addRow = () => {
      const row = createRow();
      for (let i = 0; i < this.column; i++) {
        row.appendChild(createCell());
      }
      table.appendChild(row);
      this.row++;
    };

    const addColumn = () => {
      const rows = getRows();
      for (let i = 0; i < this.row; i++) {
        rows[i].appendChild(createCell());
      }
      this.column++;
    };

    const removeRow = e => {
      const currentCell = findCell(e.target);
      if (!currentCell || !currentCell.classList.contains("cell")) {
        return;
      }
      table.removeChild(currentCell.parentNode);
      this.row--;
      if (!findCell(e.target).classList.contains("cell")) {
        btnRemoveRow.style.top = table.lastChild.offsetTop + "px";
      }
      if (getRows().length === 1) {
        btnRemoveRow.classList.remove("btn-show");
      }
    };

    const removeColumn = e => {
      const currentCell = findCell(e.target);
      if (!currentCell || !currentCell.classList.contains("cell")) {
        return;
      }
      const indexCell = Array.from(currentCell.parentNode.children).indexOf(
        currentCell
      );
      const rows = getRows();
      for (let i = 0; i < this.row; i++) {
        rows[i].removeChild(rows[i].children[indexCell]);
      }
      this.column--;
      if (!findCell(e.target).classList.contains("cell")) {
        btnRemoveColumn.style.left = getRows()[0].lastChild.offsetLeft + "px";
      }
      if (this.column === 1) {
        btnRemoveColumn.classList.remove("btn-show");
      }
    };

    /*......................Button functions........................*/

    const moveButton = e => {
      const target = e.target;
      if (target.classList.contains("cell")) {
        btnRemoveColumn.style.left = target.offsetLeft.toString() + "px";
        btnRemoveRow.style.top = target.offsetTop.toString() + "px";
      }
    };

    const showButton = () => {
      if (this.column > 1) {
        btnRemoveColumn.classList.add("btn-show");
      }
      if (this.row > 1) {
        btnRemoveRow.classList.add("btn-show");
      }
    };

    const hiddenButton = () => {
      btnRemoveColumn.classList.remove("btn-show");
      btnRemoveRow.classList.remove("btn-show");
    };

    /*......................Table creation........................*/

    if (this.flag) {
      return console.log("table already created!!!");
    }
    this.flag = true;
    if (!this.row || !this.column) {
      return null;
    }

    const div = createElement({ type: "div", classList: ["content"] });
    const btnAddColumn = createElement({
      type: "button",
      innerText: "+",
      classList: ["btn", "btn-add", "btn-add-column"]
    });
    const btnAddRow = createElement({
      type: "button",
      innerText: "+",
      classList: ["btn", "btn-add", "btn-add-row"]
    });
    const btnRemoveColumn = createElement({
      type: "button",
      innerText: "-",
      classList: ["btn", "btn-remove", "btn-remove-column"]
    });
    const btnRemoveRow = createElement({
      type: "button",
      innerText: "-",
      classList: ["btn", "btn-remove", "btn-remove-row"]
    });

    for (let j = 0; j < this.row; j++) {
      let tr = createRow();
      for (let i = 0; i < this.column; i++) {
        tr.appendChild(createCell());
      }
      table.appendChild(tr);
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
