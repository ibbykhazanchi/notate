import Card from 'react-bootstrap/Card'

const Snippet = ({text}) => {
    return (
        <Card>
            <Card.Body> {text} </Card.Body>
        </Card>
    )
}

export default Snippet;