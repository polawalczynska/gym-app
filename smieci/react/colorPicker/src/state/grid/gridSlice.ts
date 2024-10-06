import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const GRID_SIZE = 20;
const INITIAL_COLOR = '#FFFFFF';
const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;

interface GridState {
    gridColors: string[];
    selectedColor: string;
    isPresentationMode: boolean;
}

const initialState: GridState = {
    gridColors: Array(TOTAL_CELLS).fill(INITIAL_COLOR),
    selectedColor: INITIAL_COLOR,
    isPresentationMode: false,
}

const gridSlice = createSlice({
    name: 'grid',
    initialState,
    reducers: {
        setColor(state, action: PayloadAction<string>) {
            state.selectedColor = action.payload;
        },
        togglePresentationMode(state) {
            state.isPresentationMode = !state.isPresentationMode;
        },
        updateGridColor(state, action: PayloadAction<number>) {
            if (!state.isPresentationMode) {
                state.gridColors[action.payload] = state.selectedColor;
            }
        },
        setGridColors(state, action: PayloadAction<string[]>) {
            state.gridColors = action.payload;
        },
        reset(state) {
            state.gridColors.fill(INITIAL_COLOR);
        },
    },
});

export const { setColor, togglePresentationMode, updateGridColor, setGridColors, reset } = gridSlice.actions;
export default gridSlice.reducer;