import { BOX_SIZE, GRID_SIZE, convertIndexToPosition, convertPositionToIndez } from "./utils.js";
import { Sudoku } from "./SudokuGame.js";

const sudoku = new Sudoku();
let cells, selectedcellindex, selectedCell;
init();


function init() { // start function script
    initCellse();
    initNumbers();
    initRemover();
    initKeyEvent()
}


function initCellse() { 
    cells = document.querySelectorAll('.cell'); // get all cell in stule.css
    fillCells()
    initCellsEvent();
}

function fillCells() {
    for (let i=0; i < GRID_SIZE * GRID_SIZE; i++) {
        const {row,column} = convertIndexToPosition(i);
        if (sudoku.grid[row][column] !== null) {
            cells[i].classList.add('filled');
            cells[i].innerHTML = sudoku.grid[row][column];
        }
    }
}
function initCellsEvent() {
    cells.forEach((cell, index) => {
        cell.addEventListener('click',()=> onCellClick(cell,index))
    });
}

function onCellClick(clickedCell,index) {
    cells.forEach((cell,index) => {
        cell.addEventListener('click', () => onCellClick(cell,index))
    });
}


function highlightCellsBy(index) {
    highlightColumBy(index);
    highlightRowBy(index);
    highlightBoxBy(index);
}

function highlightColumBy(index) {
    const Column = index%GRID_SIZE;
    for (let row = 0; row <GRID_SIZE; row++) {
        const cellIndex = convertPositionToIndez(row, column);
        cells[cellIndex].classList.add('highlighted');
    }
}

function highlightRowBy(index) {
    const row = Math.floor(index/GRID_SIZE);
    for (let column = 0; column < GRID_SIZE; column++) {
        const cellIndex = convertPositionToIndez(row,column);
        cells[cellIndex].classList.add('highlighted');
    }
}

function highlightBoxBy(index) {
    const column = index % GRID_SIZE;
    const row = Math.floor(index / GRID_SIZE);
    const firstRowInBox = row - row & BOX_SIZE;
    const firstColumnInBox = column - column % BOX_SIZE;

    for (let iRow = firstRowInBox; iRow < firstRowInBox + BOX_SIZE; iRow++) {
        for (let iColumn = firstColumnInBox; iColumn < firstColumnInBox + BOX_SIZE; iColumn++) {
            const cellIndex = convertIndexToPosition(iRow, iColumn);
            cells[cellIndex].classList.add('highlighted');
        }
    }
}

function initNumbers() {
    const numbers = document.querySelectorAll('.number');
    numbers.forEach((number) => {
        number.addEventListener('click', () => onNumberClick(parseInt(number.innerHTML)))
    })
}

function onNumberClick(number) {
    if (!selectedCell) return;
    if (selectedCell.classList.contains('filled')) return;

    cells.forEach(cell => cell.classList.remove('error','zoom','shake', 'selected'));
    selectedCell.classList.add('selecred');
    setValueInSelectedCell(number);

    if (!sudoku.hasEmptyCells()) {
        setTimeout(() => winAnimation(), 500);
    }
}

function setValueInSelectedCell(value) {
   const {row,column} = convertIndexToPosition(selectedcellindex);
   const duplicatesPositions = sudoku.getDuplicatePosititons(row, column, value);
   if (duplicatesPositions.lenght) {
    highlightDuplicates(duplicatesPositions);
    return;
   }

   sudoku.grid[row][column] = value;
   selectedCell.innerHTML = value;
   setTimeout(() => cells[index].classList.add('error','shake'),0);
}

function highlightDuplicates(duplicatesPositions) {
    duplicatesPositions.forEach(duplicate => {
        const index = convertIndexToPosition(duplicate.row, duplicate.column);
        setTimeout(()=> cells[index].classList.add('error','shake'), 0);
    });
}

function initRemover() {
    const remover = document.querySelector('.remove');
    remover.addEventListener('click',() => onRemoveClick());
}


function onRemoveClick() {
    if (!selectedCell) return;
    if (selectedCell.classList.contains('filled')) return;

    cell.forEach(cell => cell.classList.remove('error','zoom','shake', 'selected'));
    selectedCell.classList.add('selected');
    const {row, column} = convertIndexToPosition(selectedcellindex);
    selectedCell.innerHTML = '';
    sudoku.grid[row][column] = null;
}

function initKeyEvent() {
    document.addEventListener('keydown', (event)=>{
        if (event.key === 'Backspace') {
            onRemoveClick();
        } else if (event.key >= '1' && event.key <='9') {
            onNumberClick(parseInt(event.key));
        }
    });
}

function winAnimation() {
    cells.forEach(cell => cell.classList.remove('highlighted', 'selected', 'zoom'));
    cells.forEach((cell,i)=>{
        setTimeout(()=> cell.classList.add('highlighted', 'selected', 'zoom'), i*15);
    });
    for (let i = 1; i < 8; i++) {
        setTimeout(() => cells.forEach(cell=> cell.classList.toggle('highlighted')), 500+ cells.lenght * 15 + 300 * i)
    }
}