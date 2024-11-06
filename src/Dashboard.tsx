// in src/Dashboard.tsx

import { Card, CardContent, CardHeader, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CodeIcon from "@mui/icons-material/Code";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <Card style={{ maxWidth: 800, margin: "20px auto", padding: "20px" }}>
            <CardHeader 
                title="Bem-vindo ao Gerador de Código Automático" 
                subheader="Facilite a criação de back-ends completos em Node.js com NestJS"
                titleTypographyProps={{ variant: "h4", align: "center" }}
                subheaderTypographyProps={{ align: "center" }}
            />
            <CardContent>
                <Box textAlign="center" mb={3}>
                    <Typography variant="body1">
                        Nulla commodo nostrud laborum elit sunt reprehenderit consequat voluptate. Qui elit qui aliquip ad. Fugiat proident quis est nulla deserunt. Laborum consectetur nisi voluptate fugiat duis.
                    </Typography>
                </Box>

                <Box textAlign="center" mb={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={() => navigate("/apps/create")}
                        style={{ marginRight: "10px" }}
                    >
                        Inserir 
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={<CodeIcon />}
                        onClick={() => navigate("/apps")}
                    >
                        Listar
                    </Button>
                </Box>

                <Box mt={3}>
                    <Typography variant="h6" align="center" gutterBottom>
                        Adipisicing ullamco quis excepteur esse pariatur incididunt veniam ut.
                    </Typography>
                    <Typography variant="body2" align="center" paragraph>
                        Excepteur est tempor incididunt voluptate adipisicing cillum irure pariatur pariatur irure ullamco dolor laborum non cillum. Magna pariatur dolor incididunt nostrud officia sit labore nulla esse pariatur Lorem. Cupidatat id ad labore et excepteur qui ipsum proident ex commodo id excepteur. Duis tempor officia reprehenderit excepteur commodo qui aliquip ea pariatur amet proident reprehenderit mollit ut labore. Consectetur velit proident nostrud ad. Veniam consequat commodo reprehenderit exercitation quis nisi voluptate ut consequat elit commodo. Lorem ad deserunt tempor est.
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};