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
                        Esta aplicação permite que você configure e gere automaticamente um back-end completo em Node.js utilizando o framework NestJS. 
                        Você pode definir os parâmetros da aplicação, escolher o banco de dados (PostgreSQL ou MySQL) e, com um clique, gerar o código-fonte
                        necessário para um novo projeto.
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
                        Inserir Nova Aplicação
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={<CodeIcon />}
                        onClick={() => navigate("/apps")}
                    >
                        Ver Aplicações Geradas
                    </Button>
                </Box>

                <Box mt={3}>
                    <Typography variant="h6" align="center" gutterBottom>
                        Funcionalidades Disponíveis
                    </Typography>
                    <Typography variant="body2" align="center" paragraph>
                        <ul style={{ listStyleType: "none", padding: 0 }}>
                            <li>🔹 Inserir dados de uma nova aplicação</li>
                            <li>🔹 Configurar banco de dados PostgreSQL ou MySQL</li>
                            <li>🔹 Gerar código-fonte com uma estrutura pronta para produção</li>
                            <li>🔹 Editar e visualizar aplicativos existentes</li>
                        </ul>
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};