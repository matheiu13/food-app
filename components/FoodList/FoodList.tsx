import { Card, Container, Flex, Grid, TextInput, Image, Text } from '@mantine/core';
import { ChangeEvent, useState } from 'react';
import { food } from '../../constants/dummyDB.js';

export function FoodList() {
  const [foodData, setFoodData] = useState(food);
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
  return (
    <>
      <Container p={0} pt="5vh">
        <Flex w="full" gap={5} align="center" mb={10}>
          <TextInput w="100%" placeholder="Search for an item" onChange={handleChangeQuery} />
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
