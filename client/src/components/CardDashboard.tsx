import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';

interface CardDashboardProps {
    title: string;
    value: string | number;
    color: string;
}

const CardDashboard: React.FC<CardDashboardProps> = ({ title, value, color }) => {
    const theme = useTheme();
    return (
        <Card sx={{ height: 200, backgroundColor: color }}>
            <CardContent>
                <Typography variant="h5" component="div" sx={{ color: theme.palette.secondary.main }}>
                    {title}
                </Typography>
                <Typography variant="h4" component="div" color="primary">
                    {value}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" sx={{ color: theme.palette.secondary.main }}>Learn More</Button>
            </CardActions>
        </Card>
    );
}

export default CardDashboard;