import { Card, Container, Flex, Grid, TextInput, Image, Text, Button, rem } from '@mantine/core';
import { ChangeEvent, useState } from 'react';
import { IconSortAscending, IconSortDescending } from '@tabler/icons-react';
import { food } from '../../constants/dummyDB.js';

export function FoodList() {
  const [foodData, setFoodData] = useState(food);
  const [isAscending, setIsAscending] = useState(false);
  const handleChangeQuery = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    filterFoodData(value);
  };
  const filterFoodData = (query: string) => {
    const filterDataByInput = [...food].filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFoodData(filterDataByInput);
  };
  const handleSortClick = () => {
    sortData(isAscending);
    setIsAscending(!isAscending);
  };
  const sortData = (value: boolean) => {
    if (value === true) {
      const sortedData = [...food].sort((a, b) => a.rating - b.rating);
      setFoodData(sortedData);
    } else {
      const sortedData = [...food].sort((a, b) => b.rating - a.rating);
      setFoodData(sortedData);
    }
  };
  return (
    <>
      <Container p={0} pt="5vh">
        <Flex w="full" gap={5} align="center" mb={10}>
          <TextInput w="100%" placeholder="Search for an item" onChange={handleChangeQuery} />
          {isAscending ? (
            <Button onClick={handleSortClick}>
              Sort Rating <IconSortDescending style={{ width: rem(42) }} stroke={2} />
            </Button>
          ) : (
            <Button onClick={handleSortClick}>
              Sort Rating <IconSortAscending style={{ width: rem(42) }} stroke={2} />
            </Button>
          )}
        </Flex>
        <Grid p={1}>
          {foodData.map((f, index) => (
            <Grid.Col span={4} key={index}>
              <Card shadow="sm" padding="sm" radius="md" mih="22vh" withBorder>
                <Card.Section mb={10}>
                  <Image h={200} w="full" src={f.imgURL} />
                </Card.Section>
                <Text size="xl" fw={700}>
                  {f.name}
                </Text>
                <Text size="sm" mb={10}>
                  {f.desc}
                </Text>
                <Text>Rating: {f.rating}/5</Text>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </>
  );
}
