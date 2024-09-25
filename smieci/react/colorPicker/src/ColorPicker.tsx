import React, { ChangeEvent, useState } from 'react'

type Props = {}

function ColorPicker({ }: Props) {
    const [color, setColor] = useState<string>('#FFFFFF');

    const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
        setColor(e.target.value)
    }

    const handleDivClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = e.target as HTMLDivElement;
        target.style.backgroundColor = color;
    }

    const createGrid = (size: number) => {
        const grid = [];
        for (let i = 0; i < size * size; i++) {
            grid.push(
                <div
                    key={i}
                    className='gridItem'
                    onClick={handleDivClick}
                ></div>
            )
        }
        return grid;
    }

    return (
        <div className='colorPicker'>
            <div className='container'>
                <h1>Color Picker</h1>
                <label>Select a color</label>
                <input type='color' value={color} onChange={handleColorChange} />
            </div>
            <div className='gridContainer'>
                {createGrid(20)}
            </div>

        </div>
    )
}

export default ColorPicker