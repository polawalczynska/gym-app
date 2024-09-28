import React, { useContext } from 'react';
import { GridContext } from './ColorPicker';

type Props = {};

function PresentationGrid({ }: Props) {
    const context = useContext(GridContext);

    if (!context) {
        console.log('no grid available');
        return;
    }

    const { gridColors } = context;

    return (
        <div className='presentationGrid'>
            {gridColors.map((color: string, index: number) => (
                <div
                    key={index}
                    className='gridItem'
                    style={{ backgroundColor: color }}
                ></div>
            ))}
        </div>
    );
}

export default PresentationGrid;
