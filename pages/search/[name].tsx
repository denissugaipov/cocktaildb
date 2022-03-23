import React from "react";
import { Box, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import ListItem from "../../components/ListItem";
import importIngredients from "../../core/importIngredients";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { IoIosArrowRoundBack } from "react-icons/io";

export interface IDrink {
  strDrink: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strDrinkThumb: string;
}

interface ISearchProps {
  drinks: IDrink[];
  context: string;
}

const Search = ({ drinks, context }: ISearchProps) => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  function handleChange(event: React.ChangeEvent) {
    setValue((event.target as HTMLInputElement).value);
  }
  function handleEnter(event: React.KeyboardEvent) {
    console.log(event.key);
    if (event.key === "Enter") router.push(`/search/${value}`);
  }
  return (
    <Flex mt={16} justifyContent="center" flexDir="column" alignItems="center">
      <IoIosArrowRoundBack
        size={32}
        cursor="pointer"
        style={{ backgroundColor: "#F6E05E", borderRadius: "999px" }}
        onClick={() => {
          router.push("/");
        }}
      />
      <Heading my={3}>
        {drinks ? drinks.length : "no"} «{context}» results:
      </Heading>
      <Input
        defaultValue={context}
        onChange={handleChange}
        onKeyDown={handleEnter}
        width="sm"
        placeholder="Something more?"
      />
      {drinks ? (
        drinks.map((e, i) => {
          return (
            <Box key={i}>
              <ListItem drinkData={importIngredients(e)} drink={e} />
            </Box>
          );
        })
      ) : (
        <>
          <Text my={3}>Nothing found {":("} Something else ?</Text>
          <Image width={400} height={300} src="/oops.jpeg" />
        </>
      )}
    </Flex>
  );
};
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { name } = context.query;
  const res = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
  );
  const data = await res.json();
  const { drinks } = data;

  return { props: { drinks: drinks, context: name } };
}
export default Search;
