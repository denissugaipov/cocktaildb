import React, { KeyboardEventHandler, useState } from "react";
import { Box, Button, Flex, Heading, Input } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

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
        <Input
          onChange={handleChange}
          onKeyDown={handleEnter}
          value={value}
          placeholder="What's drink today?"
          my={3}
        />
        <Flex justifyContent="center" my={3}>
          <Button
            onClick={() => {
              router.push(`/search/${value}`);
            }}
            mx={3}
          >
            Search
          </Button>
          <Button mx={3} colorScheme="orange">
            Github
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Home;
