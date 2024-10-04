import React, { ChangeEvent } from 'react';
import PresentationGrid from './PresentationGrid';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './state/store';
import { setColor, togglePresentationMode, updateGridColor } from './state/grid/gridSlice';

const GRID_SIZE = 20;
const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;

type Props = {};

function ColorPicker({ }: Props) {
    const dispatch = useDispatch();
    const { selectedColor, isPresentationMode, gridColors } = useSelector((state: RootState) => state.grid);

    const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setColor(e.target.value));
    }

    const toggleMode = () => {
        dispatch(togglePresentationMode());
    }

    const handleGridColorUpdate = (index: number) => {
        dispatch(updateGridColor(index));
    }

    const renderGrid = () => {
        return Array.from({ length: TOTAL_CELLS }, (_, index) => (
            <div
                key={index}
                className='gridItem'
                style={{ backgroundColor: gridColors[index] }}
                onClick={() => handleGridColorUpdate(index)}
            />
        ));
    };

    return (
        <div className='colorPicker'>
            <div className='container'>
                {!isPresentationMode && (
                    <div className='textContainer'>
                        <h1>Color Picker</h1>
                        <label>Select a color</label>
                        <input type='color' value={selectedColor} onChange={handleColorChange} />
                    </div>
                )}
                <div className='checkbox'>
                    <input
                        type='checkbox'
                        checked={isPresentationMode}
                        onChange={toggleMode}
                    />
                    <p>Presentation Mode</p>
                </div>
            </div>
            <div className='gridContainer'>
                {isPresentationMode ? <PresentationGrid /> : renderGrid()}
            </div>
        </div>
    );
}

export default ColorPicker;