/* eslint-disable */

import React from 'react';

export const Button = React.forwardRef((
    {
        className,
        active,
        ...props
    }, ref) => (
        <span
            {...props}
            ref={ref}
            className={`
                ${className ? className : ''}
                ${active ? 'text-primary' : 'text-muted'}
                `}
            style={{
                cursor: 'pointer',
            }}
        />
    )
);

export const Icon = React.forwardRef(
    (
        { className, ...props },
        ref
    ) => (
        <span
            {...props}
            ref={ref}
            className={`
            ${className ? className : ''}
            material-icons
            px-2
            `}
            style={{
                fontSize: "25px",
                verticalAlign: "text-bottom",
            }}
        />
    )
)