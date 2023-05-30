import { useState, useEffect } from "react";
import Todo from '../interfaces/interfaces';
import { leftZero } from "@/utils/utils";

const TodoComponent: React.FC<{ todo: Todo, selected: boolean }> = ({ todo, selected }) => {

    const [date, setDate] = useState("");

    useEffect(() => {
        const d: string = leftZero(todo.date.getDate());
        const m: string = leftZero(todo.date.getMonth() + 1);
        const h: string = leftZero(todo.date.getHours());
        const s: string = leftZero(todo.date.getSeconds());

        setDate(`${d}/${m} ${h}:${s}`);
    }, [todo]);

    const style = {
        display: "block",
        textDecoration: todo.done ? "line-through" : "none",
        backgroundColor: selected ? "#222" : "black",
        width: "100%"
    };

    return (
        <>
            <span style={style}>{date} - {todo.name}{todo.done ? " ✔" : "" }</span>
        </>
    )
}

export default TodoComponent;