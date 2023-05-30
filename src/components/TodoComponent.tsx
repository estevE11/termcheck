import { useState, useEffect } from "react";
import Todo from '../interfaces/interfaces';
import { leftZero } from "@/utils/utils";

const TodoComponent: React.FC<{ todo: Todo }> = ({ todo }) => {

    const [date, setDate] = useState("");

    useEffect(() => {
        const d: string = leftZero(todo.date.getDate());
        const m: string = leftZero(todo.date.getMonth() + 1);
        const h: string = leftZero(todo.date.getHours());
        const s: string = leftZero(todo.date.getSeconds());

        setDate(`${d}/${m} ${h}:${s}`);
    }, [todo]);

    return (
        <>
            <span>{date} - {todo.name}</span>
        </>
    )
}

export default TodoComponent;