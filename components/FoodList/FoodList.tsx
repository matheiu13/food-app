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
import { notifications, Notifications } from '@mantine/notifications';
import { food } from '../../constants/foodlist.js';
import { AddItem, InputForm } from '../AddItem/AddItem';

export function FoodList() {
  const [filteredData, setFilteredData] = useState(food);
  const [toggle, setToggle] = useState(false);
  const handleChangeQuery = (e: React.ChangeEvent<any>): void => {
    const { value } = e.target;
    filterData(value);
  };
  const filterData = (query: string) => {
    const filterDataByInput = [...food].filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filterDataByInput);
  };

  const handleSortClick = () => {
    sortData(toggle);
    setToggle(!toggle);
  };
  const sortData = (value: boolean) => {
    let sortedData: InputForm[];
    if (value === true) {
      sortedData = [...food].sort((a, b) => a.rating - b.rating);
    } else {
      sortedData = [...food].sort((a, b) => b.rating - a.rating);
    }
    setFilteredData(sortedData);
  };

  // add new item by filling up a form
  const addNewItem = (newItem: InputForm) => {
    const updatedFood = [...food, newItem];
    food.push(newItem);
    setFilteredData(updatedFood);
    modals.closeAll();
    notifications.show({
      title: 'Success',
      message: 'The item you created is successfully added.',
      autoClose: 3500,
      withCloseButton: true,
      color: 'green',
      withBorder: true,
    });
  };

  const openAddItem = () =>
    modals.open({
      title: 'Please confirm your action',
      children: <AddItem callback={addNewItem} />,
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
          <Notifications position="bottom-right" zIndex={1000} limit={4} />
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
              {filteredData.map((f, index) => (
                <Grid.Col span={4} key={index}>
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
