import { Flex, Heading, Input, Text } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useVirtual } from "react-virtual";

import ListItem from "../../components/ListItem";
import importIngredients from "../../core/importIngredients";

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
  const parentRef = React.useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtual({
    size: drinks ? drinks.length : 0,
    parentRef,
    estimateSize: React.useCallback(() => 200, []),
    overscan: 5,
  });
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
        <>
          <div
            ref={parentRef}
            className="List"
            style={{
              height: `80vh`,
              width: `400px`,
              overflow: "auto",
            }}
          >
            <div
              style={{
                height: `${rowVirtualizer.totalSize}px`,
                width: "100%",
                position: "relative",
                marginTop: "25px",
              }}
            >
              {rowVirtualizer.virtualItems.map((virtualRow) => (
                <div
                  key={virtualRow.index}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <ListItem
                    drinkData={importIngredients(drinks[virtualRow.index])}
                    drink={drinks[virtualRow.index]}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
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
