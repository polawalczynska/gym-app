import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './state/store';

type Props = {};

function PresentationGrid({ }: Props) {
    const gridColors = useSelector((state: RootState) => state.grid.gridColors)

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
