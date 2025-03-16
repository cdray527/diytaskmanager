'use client';

import React from 'react';

interface Props {
    id: string;
    label: string;
    onClick: () => void;
}

function Button({ id, label, onClick }: Props) {
    return (
        <button id={id} onClick={onClick}>
            {label}
        </button>
    );
}

export default Button;
