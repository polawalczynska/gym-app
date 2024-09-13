import React, { ChangeEvent, useState } from 'react'

type Props = {}

function ColorPicker({ }: Props) {
    const [color, setColor] = useState<string>('#FFFFFF');

    const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
        setColor(e.target.value)
    }

    return (
        <div className='container'>
            <h1>Color Picker</h1>
            <div className='display' style={{ backgroundColor: color }}>
                <p>Selected Color: {color}</p>
            </div>
            <label>Select a color</label>
            <input type='color' value={color} onChange={handleColorChange} />
        </div>
    )
}

export default ColorPicker