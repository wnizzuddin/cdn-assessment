import GuestLayout from "@/Layouts/GuestLayout";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button,
    Center,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    FormControl,
    FormLabel,
    HStack,
    IconButton,
    Input,
    Spacer,
    Table,
    TableContainer,
    Tbody,
    Text,
    Textarea,
    Th,
    Thead,
    Tr,
    useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

function Home() {
    const [list, setList] = useState([]);
    const [action, setAction] = useState("");
    const userdrawer = useDisclosure();
    const deletedialog = useDisclosure();
    const defaultValues = {
        username: "",
        mail: "",
        phoneNo: "",
        skillsets: "",
        hobby: "",
    };
    const { data, setData, reset } = useForm(defaultValues);

    useEffect(() => {
        axios.get("/api/freelancer").then((x) => {
            setList(x.data);
        });
    }, []);

    const handleSubmit = () => {
        if (action === "Add") {
            axios.post("/api/freelancer", data).then((x) => {
                setList(x.data);
            });
        } else if (action === "Edit") {
            axios.put(`api/freelancer/${data.id}`, data).then((x) => {
                setList(x.data);
            });
        } else {
            console.log(data.id);
            axios.delete(`api/freelancer/${data.id}`).then((x) => {
                setList(x.data);
            });
        }
        closeDrawer();
    };

    const closeDrawer = () => {
        reset();
        setAction("");
        userdrawer.onClose();
        deletedialog.onClose();
    };

    return (
        <GuestLayout>
            <Box
                borderRadius="10px"
                border="2px solid #ffcf00"
                boxShadow="2xl"
                h="70vh"
                p="30px"
                mx="100px"
            >
                <HStack>
                    <Text fontSize="25px">Freelancer list</Text>
                    <Spacer />
                    <Button
                        bgColor="yellow"
                        w="20%"
                        onClick={() => {
                            setAction("Add");
                            userdrawer.onOpen();
                        }}
                    >
                        + New User
                    </Button>
                </HStack>

                <TableContainer my="30px">
                    <Table size="md" variant="simple">
                        <Thead textAlign="center">
                            <Tr>
                                <Th>No</Th>
                                <Th>Username</Th>
                                <Th>Mail</Th>
                                <Th>Phone Number</Th>
                                <Th>Skillsets</Th>
                                <Th>Hobby</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {list.map((item, index) => {
                                return (
                                    <Tr key={index}>
                                        <Th>{index + 1}</Th>
                                        <Th>{item.username}</Th>
                                        <Th>{item.mail}</Th>
                                        <Th>{item.phoneNo}</Th>
                                        <Th>{item.skillsets}</Th>
                                        <Th>{item.hobby}</Th>
                                        <Th>
                                            <HStack>
                                                <IconButton
                                                    icon={<FiEdit2 />}
                                                    onClick={() => {
                                                        setAction("Edit");
                                                        setData(item);
                                                        userdrawer.onOpen();
                                                    }}
                                                />
                                                <IconButton
                                                    icon={<FiTrash2 />}
                                                    onClick={() => {
                                                        setData(item);
                                                        deletedialog.onOpen();
                                                    }}
                                                />
                                            </HStack>
                                        </Th>
                                    </Tr>
                                );
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>

            <Drawer size="md" isOpen={userdrawer.isOpen} onClose={closeDrawer}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader>{action} user</DrawerHeader>

                    <DrawerBody>
                        <FormControl my="20px">
                            <FormLabel>Username</FormLabel>
                            <Input
                                defaultValue={
                                    data && data.username ? data.username : ""
                                }
                                placeholder="Username"
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        username: e.target.value,
                                    });
                                }}
                            />
                        </FormControl>

                        <FormControl my="20px">
                            <FormLabel>Mail</FormLabel>
                            <Input
                                defaultValue={
                                    data && data.mail ? data.mail : ""
                                }
                                type="email"
                                placeholder="Mail"
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        mail: e.target.value,
                                    });
                                }}
                            />
                        </FormControl>

                        <FormControl my="20px">
                            <FormLabel>Phone No</FormLabel>
                            <Input
                                defaultValue={
                                    data && data.phoneNo ? data.phoneNo : ""
                                }
                                placeholder="Phone No"
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        phoneNo: e.target.value,
                                    });
                                }}
                            />
                        </FormControl>

                        <FormControl my="20px">
                            <FormLabel>Skillsets</FormLabel>
                            <Textarea
                                defaultValue={
                                    data && data.skillsets ? data.skillsets : ""
                                }
                                placeholder="Skillsets"
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        skillsets: e.target.value,
                                    });
                                }}
                            />
                        </FormControl>

                        <FormControl my="20px">
                            <FormLabel>Hobby</FormLabel>
                            <Input
                                defaultValue={
                                    data && data.hobby ? data.hobby : ""
                                }
                                placeholder="Hobby"
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        hobby: e.target.value,
                                    });
                                }}
                            />
                        </FormControl>
                    </DrawerBody>

                    <Center>
                        <DrawerFooter>
                            <HStack>
                                <Button
                                    w="200px"
                                    onClick={handleSubmit}
                                    bgColor="green.300"
                                >
                                    {action === "Add" ? "Submit" : "Save"}
                                </Button>
                                <Button w="200px" onClick={closeDrawer}>
                                    Cancel
                                </Button>
                            </HStack>
                        </DrawerFooter>
                    </Center>
                </DrawerContent>
            </Drawer>

            <AlertDialog
                isOpen={deletedialog.isOpen}
                onClose={deletedialog.onClose}
            >
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete User
                    </AlertDialogHeader>

                    <AlertDialogBody>This cannot be undo</AlertDialogBody>

                    <AlertDialogFooter>
                        <Button>Cancel</Button>
                        <Button
                            colorScheme="red"
                            onClick={() => {
                                handleSubmit();
                                deletedialog.onClose;
                            }}
                            ml={3}
                        >
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </GuestLayout>
    );
}

export default Home;
