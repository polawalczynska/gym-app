import React, { ChangeEvent, createContext, useEffect, useState } from 'react';
import PresentationGrid from './PresentationGrid';

interface GridContextType {
    gridColors: string[];
}

export const GridContext = createContext<GridContextType | null>(null);

const GRID_SIZE = 20;
const INITIAL_COLOR = '#FFFFFF';
const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;

type Props = {};

function ColorPicker({ }: Props) {
    const [selectedColor, setSelectedColor] = useState<string>(INITIAL_COLOR);
    const [isPresentationMode, setIsPresentationMode] = useState<boolean>(false);
    const [gridColors, setGridColors] = useState<string[]>(() => {
        const data = window.localStorage.getItem('painting');
        return data ? JSON.parse(data) : Array(TOTAL_CELLS).fill(INITIAL_COLOR);
    });

    useEffect(() => {
        window.localStorage.setItem('painting', JSON.stringify(gridColors))
    }, [gridColors])

    const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedColor(e.target.value);
    };

    const togglePresentationMode = () => {
        setIsPresentationMode(prevMode => !prevMode);
    };

    const updateGridColor = (index: number) => {
        if (isPresentationMode) return;

        const updatedGridColors = [...gridColors];
        updatedGridColors[index] = selectedColor;
        setGridColors(updatedGridColors);
    };

    const renderGrid = () => {
        return Array.from({ length: TOTAL_CELLS }, (_, index) => (
            <div
                key={index}
                className='gridItem'
                style={{ backgroundColor: gridColors[index] }}
                onClick={() => updateGridColor(index)}
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
                        onChange={togglePresentationMode}
                    />
                    <p>Presentation Mode</p>
                </div>
            </div>
            <GridContext.Provider value={{ gridColors }}>
                <div className='gridContainer'>
                    {isPresentationMode ? <PresentationGrid /> : renderGrid()}
                </div>
            </GridContext.Provider>
        </div>
    );
}

export default ColorPicker;