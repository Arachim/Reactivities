import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";

export default function HomePage() {
    return (
        <Container style={{marginTop: '7em'}}>
            <h1>בית</h1>
            <h3>גלוש ל <Link to='/activities'>פעילויות</Link></h3>
        </Container>
    )
}