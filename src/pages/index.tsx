import {
    Container,
    Row,
    Col
} from "react-bootstrap";


import { useState, useEffect } from "react";
import Todo from '../interfaces/interfaces';
import TodoComponent from '../components/TodoComponent';
import useEventListener from "@/hooks/useEventListener";
import { updateTodo } from "@/utils/utils";

export default function Home() {
    
    const [list, setList] = useState([] as Todo[]);
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        loadItems().then((data: any) => {
            setList(data as Todo[]);
        });
    }, []);

    const loadItems = async () => {
        return new Promise((resolve, reject) => {
            const response = fetch("http://localhost:3000/api/todo")
                .then(response => response.json())
                .then(data => resolve(data.rows.map(formatItem)));
        });
    }

    const formatItem = (item: Todo): Todo => {
        if(typeof item.date == "string")
            item.date = new Date(item.date);
        if(typeof item.done == "number")
            item.done = (item.done as number == 1);
        return item;
    }

    const selectedUp = () => {
        if (selected == 0) return;
        setSelected(selected - 1);
    }

    const selectedDown = () => {
        if (selected >= list.length - 1) return;
        setSelected(selected + 1);
    }

    useEventListener("keydown", (event: KeyboardEvent) => {
        if (event.key == 'j' || event.key == 'ArrowDown') selectedDown();
        if (event.key == 'k' || event.key == 'ArrowUp') selectedUp();

        if (event.key == 'Enter') {
            event.preventDefault();
            todoToggle(selected);
        }
    });

    const todoToggle = (index: number) => {
        let item = list[index];
        item.done = !item.done;
        updateTodo({
            id: item.id,
            done: item.done ? 1 : 0
        }).then((data) => {
            let lst: Todo[] = [...list];
            lst[index] = { ...item };
            setList([...lst]);
        });
    }

    return (
        <>
            <Container>
                {
                    list.map((item: Todo, index: number) => (
                        <Row>
                            <Col>
                                <TodoComponent todo={item} selected={index == selected}></TodoComponent>
                            </Col>
                        </Row>
                    ))
                }
            </Container>
        </>
    )
}
