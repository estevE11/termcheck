import {
    Container,
    Row,
    Col
} from "react-bootstrap";


import { useState, useEffect } from "react";
import Todo from '../interfaces/interfaces';
import TodoComponent from '../components/TodoComponent';
import useEventListener from "@/hooks/useEventListener";

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
        setSelected(selected - 1);
    }

    const selectedDown = () => {
        setSelected(selected + 1);
    }

    useEventListener("keydown", (event: KeyboardEvent) => {
        if (event.key == 'j') selectedDown();
        if (event.key == 'k') selectedUp();
    });

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
