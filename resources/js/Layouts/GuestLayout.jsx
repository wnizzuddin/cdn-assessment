import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import React from "react";

function GuestLayout({ children }) {
    return (
        <div>
            <Grid
                templateAreas={`"header"
                "main"
                "main"`}
                gridTemplateRows={"auto 1fr auto"}
                h="100vh"
                w="100vw"
                gap="1"
            >
                <GridItem area={"header"} boxShadow="base">
                    <Box bgColor="#ffcf00" p="30px 50px">
                        <Heading>Complete Developer Network</Heading>
                    </Box>
                </GridItem>
                <GridItem p="50px" overflowY="auto" area={"main"}>
                    {children}
                </GridItem>
            </Grid>
        </div>
    );
}

export default GuestLayout;
