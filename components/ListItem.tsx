import React from "react";
import {
  Flex,
  Accordion,
  AccordionButton,
  Box,
  AccordionPanel,
  AccordionItem,
  AccordionIcon,
  Text,
  Link,
  Heading,
  Badge,
  HStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { IDrink } from "../pages/search/[name]";
import { GiWineGlass } from "react-icons/gi";

interface IDrinkData {
  ingredients: string[];
  measures: string[];
}

interface IDrinkObject {
  drink: IDrink;
  drinkData: IDrinkData;
}

const ListItem = ({ drink, drinkData }: IDrinkObject) => {
  return (
    <Flex boxSize="sm" flexDir="column" my={3} height="fit-content" shadow="md">
      <Flex flexDirection="row" alignItems="center">
        <Image
          src={drink.strDrinkThumb}
          width={128}
          height={128}
          alt="DrinkPreview"
        />
        <Flex ml={5}>
          <Flex flexDirection="column">
            <Heading size="md" my={1}>
              {drink.strDrink}
            </Heading>
            <Badge
              my={1}
              width="fit-content"
              colorScheme={drink.strAlcoholic === "Alcoholic" ? "red" : "blue"}
            >
              {drink.strAlcoholic}
            </Badge>
            <HStack>
              <Text>{drink.strGlass}</Text>
              <GiWineGlass />
            </HStack>
          </Flex>
        </Flex>
      </Flex>
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                See recipe
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} textAlign="left">
            <Text fontWeight="semibold" my={1}>
              Ingredients:
            </Text>
            {drinkData.ingredients.map((e, i) => {
              return (
                <Flex key={i}>
                  <Link
                    href={`https://en.wikipedia.org/wiki/${e}`}
                    textColor="cyan.700"
                    mr={3}
                  >
                    {i + 1}. {e}
                  </Link>
                  {drinkData.measures[i] && (
                    <Text color="gray.600">{drinkData.measures[i]}</Text>
                  )}
                </Flex>
              );
            })}
            <Text fontWeight="semibold" my={1}>
              Instruction:
            </Text>
            <Text>{drink.strInstructions}</Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};

export default ListItem;
