import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";

interface CardDashboardProps {
    title: string;
    value: string | number;
    color: string;
}

const CardDashboard: React.FC<CardDashboardProps> = ({ title, value, color }) => {
    return (
        <Card sx={{ height: 200, backgroundColor: color }}>
            <CardContent>
                <Typography variant="h5" component="div" sx={{ color: 'white' }}>
                    {title}
                </Typography>
                <Typography variant="h4" component="div" color="primary">
                    {value}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" sx={{ color: 'white' }}>Learn More</Button>
            </CardActions>
        </Card>
    );
}

export default CardDashboard;