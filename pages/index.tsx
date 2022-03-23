import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
const Home: NextPage = () => {
  const [value, setValue] = useState<string>("");
  function handleChange(event: React.ChangeEvent) {
    setValue((event.target as HTMLInputElement).value);
  }
  function handleEnter(event: React.KeyboardEvent) {
    console.log(event.key);
    if (event.key === "Enter") router.push(`/search/${value}`);
  }
  const router = useRouter();
  return (
    <Flex
      height="100vh"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box width="sm">
        <Flex justifyContent="center" alignItems="center" my={3}>
          <Heading fontWeight="light" mx={3}>
            CocktailDB
          </Heading>
          <Image src="/cocktail.png" height={30} width={30} alt="Cocktail" />
        </Flex>
        <Text textAlign="center" textColor="gray.500">
          Search engine for alco / non-alco drinks with recipes
        </Text>
        <Center>
          <Input
            width="80%"
            onChange={handleChange}
            onKeyDown={handleEnter}
            value={value}
            placeholder="What's drink today?"
            my={3}
          />
        </Center>
        <Flex justifyContent="center" alignItems="center" my={3}>
          <Button
            fontWeight="light"
            onClick={() => {
              router.push(`/search/${value}`);
            }}
            mx={3}
          >
            Search
          </Button>
          <Link
            borderWidth="2px"
            borderColor="orange.500"
            textColor="orange.500"
            py={1.5}
            px={6}
            _hover={{ backgroundColor: "orange.500", textColor: "white" }}
            rounded="md"
            href="https://github.com/denissugaipov/cocktaildb"
            mx={3}
            colorScheme="orange"
          >
            Github
          </Link>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Home;
