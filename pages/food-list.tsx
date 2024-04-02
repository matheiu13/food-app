import { ActionIcon, Card, Container, Grid, Image, Text, TextInput, rem } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { useState } from 'react';
import { food } from '../constants/foodlist.js';

export default function FoodPage() {
  const [, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState(food);
  //   const []

  const handleChangeQuery = (e: React.ChangeEvent<any>): void => {
    const { value } = e.target;
    setQuery(value);
    filterData(value);
  };

  const filterData = (query: string) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const filteredData = food.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  return (
    <>
      <Container p={0} pt="5vh">
        <TextInput
          onChange={handleChangeQuery}
          placeholder="Search for an item"
          rightSection={
            <ActionIcon size={32} radius="xl" variant="filled">
              <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
          }
        />
        <br />
        <Grid p={1}>
          {filteredData.map((f) => (
            <Grid.Col span={4}>
              <Card shadow="sm" padding="sm" radius="md" withBorder>
                <Card.Section mb={15}>
                  <Image h={200} w="full" fit="cover" src={f.imgURL} />
                </Card.Section>
                <Text size="xl" c="white" fw={500}>
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
