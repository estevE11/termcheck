import {
    Container,
    Row,
    Col
} from "react-bootstrap";


import { useState } from "react";

export default function Home() {
    
    const [list, setList] = useState(['01/06 23:59 - Lab 6 (Xarxes)', 'tardes']); 

    return (
        <>
            <Container>
                {
                    list.map((item: string, index: number) => (
                        <Row>
                            <Col>
                                <span>{item}</span>
                            </Col>
                        </Row>
                    ))
                }
            </Container>
        </>
    )
}
