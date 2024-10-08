import React from "react";
import { FaTrash } from "react-icons/fa"


interface DeleteButtonProps {
    onDelete: () => Promise<void>;

}
const deleteButton: React.FC<DeleteButtonProps> = (props) => {
    return (
        <button onClick={props.onDelete} title="Delete"><FaTrash size={25}/></button>
    )
}

export default deleteButton;