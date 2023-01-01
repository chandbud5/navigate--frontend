import React from "react";
import { Box, Flex, Card, CardBody, Heading, Text } from "@chakra-ui/react";

function PricingAvailability() {
    return (
        <Box>
            <Flex
                align="center"
                justify="space-between"
                direction={["column", "column", "row"]}>
                <Heading variant="view">Availability</Heading>
                <Card
                    w={["90%", "90%", "75%"]}
                    mb="1vw"
                    bg="white"
                    borderRadius="0.3em"
                >
                    <CardBody>
                        <Text>
                            Monday to Friday - 8:00 PM to 10:00 PM , Saturday,
                            Sunday - 11:00 AM to 04:00 PM
                        </Text>
                    </CardBody>
                </Card>
            </Flex>
            <Flex
                align="center"
                justify="space-between"
                direction={["column", "column", "row"]}
            >
                <Heading variant="view">Pricing</Heading>
                <Card
                    w={["90%", "90%", "75%"]}
                    mb="1vw"
                    bg="white"
                    borderRadius="0.3em"
                >
                    <CardBody>
                        <Text>150 Rs per hour</Text>
                    </CardBody>
                </Card>
            </Flex>
        </Box>
    );
}

export default PricingAvailability;