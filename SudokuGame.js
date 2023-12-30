import { generateSudoku } from "./SudokuGenetator.js";
import { BOX_SIZE, GRID_SIZE } from "./utils.js";

export class Sudoku {
    constructor(){
        this.grid = generateSudoku();
    }

    getDuplicatePosititons(row, column, value) {
        const dupInColumm = this.getDuplicPositonsInColumn(row,column,value);
        const dupInRow = this.getDupPositionInRow(row,column,value);
        const dupInBox = this.getDupPositionInBox(row,column,value);

        const duplicates = [...dupInColumm,...dupInRow];
        dupInBox.forEach(dupInBox => {
            if (dupInBox.row !== row && dupInBox.column !== column) duplicates.push(dupInBox);
        });
        return duplicates
    }


    getDuplicPositonsInColumn(row,column,value) {
        const Diplicate = [];
        for (let iR = 0; iR < GRID_SIZE; iR++) {
            if (this.grid[iR][column] === value && iR !== row) {
                Diplicate.push({row:iR, column});
            }
        }
        return Diplicate
    }


    getDupPositionInRow(row,column,value) {
        const Diplicate = [];
        for (let IC = 0; IC < GRID_SIZE; IC++) {
            if (this.grid[row][IC] === value && IC !== column) {
                Diplicate.push({row, column:IC})
            }
        }
        return Diplicate;
    }

    getDupPositionInBox(row,column,value) {
        const Diplicate = [];
        const firstRowInBox = row - row % BOX_SIZE;
        const firstColumnInBox = column - column % BOX_SIZE;
        
        for (let IR = firstRowInBox; IR < firstRowInBox + BOX_SIZE;IR++) {
            for (let IC =firstColumnInBox; IC < firstColumnInBox + BOX_SIZE; IC++){
                if (this.grid[IR][IC] === value && IR !== row && IC !== column) {
                    Diplicate.push({row:IR,column:IC});
                }
            }
        }
        return Diplicate
    }

    hsEmptyCells() {
        return Boollean(findEmptyCell(this.grid))
    }

}