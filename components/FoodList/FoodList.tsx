import {
  ActionIcon,
  Card,
  Container,
  Flex,
  Grid,
  Image,
  MantineProvider,
  Text,
  TextInput,
  rem,
} from '@mantine/core';
import { IconPlus, IconSortDescending, IconSortAscending } from '@tabler/icons-react';
import { useState } from 'react';
import { ModalsProvider, modals } from '@mantine/modals';
import { food } from '../../constants/foodlist.js';
import { AddItem } from '../AddItem/AddItem';

export function FoodList() {
  const [filteredData, setFilteredData] = useState(food);
  const [toggle, setToggle] = useState(false);
  const handleChangeQuery = (e: React.ChangeEvent<any>): void => {
    const { value } = e.target;
    filterData(value);
  };
  const filterData = (query: string) => {
    const filterDataByInput = food.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filterDataByInput);
  };

  const handleSortClick = () => {
    sortData(toggle);
    setToggle(!toggle);
  };
  const sortData = (value: boolean) => {
    let sortedData: typeof food;
    if (value === true) {
      sortedData = food.sort((a, b) => a.rating - b.rating);
    } else {
      sortedData = food.sort((a, b) => b.rating - a.rating);
    }
    setFilteredData(sortedData);
  };

  const addNewItem = (value: any) => {
    food.push(value);
  };

  const openAddItem = () =>
    modals.open({
      title: 'Please confirm your action',
      children: <AddItem callback={addNewItem} closeModal={() => {}} />,
    });
  const viewImage = (img: string) =>
    modals.open({
      size: 'xl',
      padding: '0',
      withCloseButton: false,
      children: <Image h="auto" w="100%" src={img} fit="contain" />,
    });

  return (
    <>
      <MantineProvider>
        <ModalsProvider>
          <Container p={0} pt="5vh">
            <Flex w="full" gap={5} align="center">
              <TextInput w="100%" onChange={handleChangeQuery} placeholder="Search for an item" />
              <ActionIcon size={32} radius="sm" variant="filled" onClick={handleSortClick}>
                {toggle ? (
                  <IconSortDescending style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                ) : (
                  <IconSortAscending style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                )}
              </ActionIcon>
              <ActionIcon size={32} radius="sm" variant="filled" onClick={openAddItem}>
                <IconPlus style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
              </ActionIcon>
            </Flex>
            <br />
            <Grid p={1}>
              {filteredData.map((f) => (
                <Grid.Col span={4} key={f.name}>
                  <Card shadow="sm" padding="sm" radius="md" miw="20vh" withBorder>
                    <Card.Section mb={10}>
                      <Image
                        h={200}
                        w="full"
                        fit="cover"
                        src={f.imgURL}
                        onClick={() => viewImage(f.imgURL)}
                      />
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
        </ModalsProvider>
      </MantineProvider>
    </>
  );
}
