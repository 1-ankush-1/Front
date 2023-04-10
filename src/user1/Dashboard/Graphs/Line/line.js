import { CChart } from '@coreui/react-chartjs'
import Container from '@mui/material/Container'

const Line = (props) => {

    const options = {
        scales: {
            y: {
                title: {
                    font: {
                        size: 18
                    },
                    color:"grey",
                    display: true,
                    text: 'Percentage'
                }
            },
            x: {
                title: {
                    font: {
                        size: 16
                    },
                    color:"grey",
                    display: true,
                    text: 'Days',
                }
            }
        },
    };

    return (
        <Container maxWidth="sm">
            <CChart type="line" data={{ labels: props.labels, datasets: props.datasets }} options={options} />
        </Container>
    )
}

export default Line;