import React, { ChangeEvent, useEffect } from 'react';
import PresentationGrid from './PresentationGrid';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './state/store';
import { setColor, togglePresentationMode, updateGridColor, setGridColors, reset } from './state/grid/gridSlice';

const GRID_SIZE = 20;
const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;
const GRID_COLORS_ADDRESS = 'http://192.168.1.4:3000/grid'

type Props = {};

function ColorPicker({ }: Props) {
    const dispatch = useDispatch();
    const { selectedColor, isPresentationMode, gridColors } = useSelector((state: RootState) => state.grid);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(GRID_COLORS_ADDRESS);
                if (response.ok) {
                    const serverGridColors = await response.json();
                    dispatch(setGridColors(serverGridColors));
                } else {
                    console.error('Error fetching grid data: ', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching grid data: ', error);
            }
        };

        fetchData();
    }, [dispatch]);

    useEffect(() => {
        const intervalId = setInterval(async () => {
            try {
                const response = await fetch(GRID_COLORS_ADDRESS);
                if (response.ok) {
                    const serverGridColors = await response.json();
                    dispatch(setGridColors(serverGridColors));
                } else {
                    console.error('Error fetching grid data: ', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching grid data: ', error);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [dispatch]);

    useEffect(() => {
        const saveData = async () => {
            try {
                const response = await fetch(GRID_COLORS_ADDRESS, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(gridColors),
                });

                if (!response.ok) {
                    console.error('Error saving grid data: ', response.statusText);
                }
            } catch (error) {
                console.error('Error saving grid data: ', error);
            }
        };

        saveData();
    }, [gridColors]);

    const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setColor(e.target.value));
    };

    const toggleMode = () => {
        dispatch(togglePresentationMode());
    };

    const handleGridColorUpdate = (index: number) => {
        dispatch(updateGridColor(index));
    };

    const handleReset = () => {
        dispatch(reset());
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
                        <input
                            type='color'
                            value={selectedColor}
                            onChange={handleColorChange}
                        />
                        <button onClick={handleReset}>New painting</button>
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
