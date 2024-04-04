import {
  Box,
  Button,
  Card,
  Collapse,
  Container,
  Flex,
  Grid,
  Image,
  Text,
  TextInput,
  UnstyledButton,
  rem,
} from '@mantine/core';
import { IconSquareRoundedPlus, IconSortDescending, IconSortAscending } from '@tabler/icons-react';
import { ChangeEvent, useState } from 'react';
import { ModalsProvider, modals } from '@mantine/modals';
import { notifications, Notifications } from '@mantine/notifications';
import { food } from '../../constants/foodlist.js';
import { AddItem, InputForm } from '../AddItem/AddItem';

export function FoodList() {
  const [filteredData, setFilteredData] = useState(food);
  const [toggler, setToggle] = useState(false);
  const [openedCards, setOpenedCards] = useState(new Array(filteredData.length).fill(false));

  const handleChangeQuery = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    filterData(value);
  };
  const filterData = (query: string) => {
    const filterDataByInput = [...filteredData].filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filterDataByInput);
  };

  const handleSortClick = () => {
    sortData(toggler);
    setToggle(!toggler);
  };
  const sortData = (value: boolean) => {
    let sortedData: InputForm[];
    if (value === true) {
      sortedData = [...filteredData].sort((a, b) => a.rating - b.rating);
    } else {
      sortedData = [...filteredData].sort((a, b) => b.rating - a.rating);
    }
    setFilteredData(sortedData);
  };

  // add new item by filling up a form
  const addNewItem = (newFoodItem: InputForm) => {
    setFilteredData((previousFoodList) => [...previousFoodList, newFoodItem]);
    // food.push(newItem);
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
      size: 'lg',
      padding: '0',
      withCloseButton: false,
      children: <Image w="100%" src={img} fit="contain" />,
    });

  // const [opened, { toggle }] = useDisclosure(false);
  const toggleCard = (index: number) => {
    const newOpenedCards = [...openedCards];
    newOpenedCards[index] = !newOpenedCards[index];
    setOpenedCards(newOpenedCards);
  };

  return (
    <>
      <ModalsProvider>
        <Notifications position="bottom-right" zIndex={1000} limit={4} />
        <Container p={0} pt="5vh">
          <Flex w="full" gap={5} align="center">
            <TextInput w="100%" onChange={handleChangeQuery} placeholder="Search for an item" />

            {toggler ? (
              <Button onClick={handleSortClick}>
                Sort Rating
                <IconSortDescending style={{ width: rem(54), marginLeft: '5px' }} stroke={2} />
              </Button>
            ) : (
              <Button onClick={handleSortClick}>
                Sort Rating
                <IconSortAscending style={{ width: rem(54), marginLeft: '5px' }} stroke={2} />
              </Button>
            )}
            <Button onClick={openAddItem}>
              Add Item
              <IconSquareRoundedPlus style={{ width: rem(52), marginLeft: '5px' }} stroke={2.5} />
            </Button>
          </Flex>
          <br />
          <Grid p={1}>
            {filteredData.map((f, index) => (
              <Grid.Col span={4} key={index}>
                <Card shadow="lg" padding="sm" radius="md" mih="60vh" withBorder>
                  <Card.Section mb={10}>
                    <Image
                      h={200}
                      w="full"
                      src={f.imgURL}
                      onClick={() => viewImage(f.imgURL)}
                      alt={f.name || 'Food'}
                    />
                  </Card.Section>
                  <Text size="xl" fw={700}>
                    {f.name}
                  </Text>
                  {openedCards[index] ? (
                    <Box
                      onClick={() => toggleCard(index)}
                      style={{ cursor: 'pointer', display: 'none' }}
                    >
                      <Text mb={10} truncate>
                        {f.desc}
                      </Text>
                    </Box>
                  ) : (
                    <>
                      {f.desc.length >= 40 ? (
                        <Box
                          onClick={() => toggleCard(index)}
                          style={{ cursor: 'pointer', display: 'flex', flexWrap: 'wrap' }}
                        >
                          <Text size="sm" mb={10} truncate>
                            {f.desc}
                          </Text>
                          <Text size="sm" mb={10} style={{ marginLeft: 'auto' }}>
                            <u>view more</u>
                          </Text>
                        </Box>
                      ) : (
                        <Box>
                          <Text size="sm" mb={10} truncate>
                            {f.desc}
                          </Text>
                        </Box>
                      )}
                    </>
                  )}

                  <Collapse in={openedCards[index]}>
                    <Text size="sm" mb={10}>
                      {f.desc}

                      <UnstyledButton
                        onClick={() => toggleCard(index)}
                        style={{ marginLeft: '0.5rem' }}
                      >
                        <u>view less</u>
                      </UnstyledButton>
                    </Text>
                  </Collapse>
                  <Text mt="auto">Rating: {f.rating}/5</Text>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </ModalsProvider>
    </>
  );
}
