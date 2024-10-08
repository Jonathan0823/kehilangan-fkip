import React from "react";
import { FaTrash } from "react-icons/fa"


interface DeleteButtonProps {
    onClick: () => void;
}

const deleteButton: React.FC<DeleteButtonProps> = (props) => {
    return (
        <button onClick={props.onClick} title="Delete"><FaTrash size={20}/></button>
    )
}

export default deleteButton;