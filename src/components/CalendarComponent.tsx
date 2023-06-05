import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const CalendarComponent: React.FC<{}> = ({ }) => {

    const today = new Date().getDate();

    const [month, setMonth] = useState(new Date().getMonth()+1);
    const [year, setYear] = useState(new Date().getFullYear());

    const [days, setDays] = useState([[]]);

    useEffect(() => {
        const datenow = new Date();
        const monstart = new Date(`${year}-${month}-1`).getDay();
        const monlen = getMonthLength(month);
        console.log(monlen);
        let arr = [];
        for (let i = 0; i < monlen + 7-monstart; i++) {
            const row = Math.floor(i / 7);
            if (i % 7 == 0) {
                arr.push([]);    
            }
            if (i < monstart-2) {
                (arr[0] as number[]).push(0);
                continue;
            }
            (arr[row] as number[]).push(i - monstart+2);

        }
        for (let i = arr[arr.length-1].length; i < 7; i++) {
            (arr[arr.length-1] as number[]).push(0);
        }
        setDays(arr);
        console.log(today)
    }, [month, year]);

    const getMonthLength = (m: number): number => {
        const date1: number = new Date(m +'/1/' + year).getTime();
        const date2: number = new Date((m+1) + '/1/' + year).getTime();
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        return diffDays;
    }

    const nextMonth = () => {
        if (month + 1 > 12) setMonth(1);
        else setMonth(month + 1);
    }

    const prevMonth = () => {
        if (month - 1 < 1) setMonth(12);
        else setMonth(month - 1);
    }

    return (
        <>
            <Container>
                {days.map((week: number[]) => (
                    <Row>
                        {week.map((day: number) => (
                            <Col style={{ color: today == day ? '#99ff99' : 'green'}}>
                                {day == 0 ? '' : day}
                            </Col>
                        ))}
                    </Row>
                ))}
            </Container>
        </>
    )
}

export default CalendarComponent;