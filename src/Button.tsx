import React from "react";

type Props = {
    title: string
    onClick?: () => void
    className?: string
}


export const Button = (props: Props) => {
    const {title, onClick, className} = props;

    return (
        <button onClick={onClick} className={className}>{title}</button>
    )
}