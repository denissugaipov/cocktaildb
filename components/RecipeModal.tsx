import {
  Button,
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

import { IDrink } from "../pages/search/[name]";
import { IDrinkData } from "./ListItem";

interface IModal {
  drink: IDrink;
  onOpen: () => void;
  isOpen: boolean;
  onClose: () => void;
  drinkData: IDrinkData;
}

function RecipeModal({ onOpen, isOpen, onClose, drink, drinkData }: IModal) {
  return (
    <>
      <Button onClick={onOpen} rounded="none">
        Show recipe
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{drink.strDrink} recipe</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Image src={drink.strDrinkThumb} width={160} height={160} />
              <Flex direction="column" ml={3}>
                {drinkData.ingredients.map((e: string, i: number) => {
                  return (
                    <Flex direction="row" key={i}>
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
              </Flex>
            </Flex>
            <Text fontWeight="semibold" mt={3}>
              Instruction:
            </Text>
            <Text>{drink.strInstructions}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default RecipeModal;
