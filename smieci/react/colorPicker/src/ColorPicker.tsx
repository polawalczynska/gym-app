import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import PresentationGrid from './PresentationGrid';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './state/store';
import { setColor, togglePresentationMode, updateGridColor, setGridColors, reset } from './state/grid/gridSlice';

const GRID_SIZE = 20;
const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;

type Props = {};

function ColorPicker({ }: Props) {
    const dispatch = useDispatch();
    const { selectedColor, isPresentationMode, gridColors } = useSelector((state: RootState) => state.grid);
    const ws = useRef<WebSocket | null>(null);
    const [isClientUpdated, setIsClientUpdated] = useState(false);

    useEffect(() => {
        connectWebSocket();

        return () => {
            ws.current?.close();
        };
    }, []);

    useEffect(() => {
        if (isClientUpdated) {
            setIsClientUpdated(false);
        }
    }, [isClientUpdated]);

    useEffect(() => {
        if (isClientUpdated) {
            console.log('sending data to server: ', gridColors);
            sendData();
        }
    }, [gridColors]);

    const connectWebSocket = () => {
        ws.current = new WebSocket('ws://192.168.1.4:3000');

        ws.current.onopen = () => {
            console.log('connected to server');
        }

        ws.current.onmessage = (event) => {
            console.log('received data from server');
            const data = JSON.parse(event.data);
            dispatch(setGridColors(data.gridColors));
            setIsClientUpdated(true);
        }

        ws.current.onclose = (event) => {
            console.log('ws closed:', event);
            setTimeout(() => {
                ws.current = new WebSocket('ws://localhost:3000');
            }, 1000);
        }

        return () => {
            ws.current?.close();
            console.log('disconnected from server');
        };
    };

    const sendData = () => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify({ event: 'update', gridColors }));
        } else {
            console.log('ws not connected');
        }
    }

    const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setColor(e.target.value));
    };

    const toggleMode = () => {
        dispatch(togglePresentationMode());
    };

    const handleGridColorUpdate = (index: number) => {
        dispatch(updateGridColor(index));
        setIsClientUpdated(true);
    };

    const handleReset = () => {
        dispatch(reset());
        setIsClientUpdated(true);
    };

    const renderGrid = () => {
        if (!gridColors || gridColors.length !== TOTAL_CELLS) {
            return null;
        }

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
