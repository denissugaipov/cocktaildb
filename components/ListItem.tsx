import {
  Badge,
  Center,
  Flex,
  Heading,
  HStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { GiWineGlass } from "react-icons/gi";

import { IDrink } from "../pages/search/[name]";
import RecipeModal from "./RecipeModal";

export interface IDrinkData {
  ingredients: string[];
  measures: string[];
}

export interface IDrinkObject {
  drink: IDrink;
  drinkData: IDrinkData;
}

const ListItem = ({ drink, drinkData }: IDrinkObject) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Center>
      <Flex
        boxSize="sm"
        flexDir="column"
        my={3}
        height="fit-content"
        shadow="md"
        width="90%"
      >
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
                colorScheme={
                  drink.strAlcoholic === "Alcoholic" ? "red" : "blue"
                }
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
        <RecipeModal
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          drink={drink}
          drinkData={drinkData}
        />
      </Flex>
    </Center>
  );
};

export default ListItem;
