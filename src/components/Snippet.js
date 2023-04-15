import Card from 'react-bootstrap/Card'
import styled from 'styled-components/macro';


const Snippet = ({text}) => {
    const StyledCard = styled(Card)`
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    `;

    return (
        <StyledCard>
            <Card.Body> <i> "{text}" </i></Card.Body>
        </StyledCard>
    )
}

export default Snippet;