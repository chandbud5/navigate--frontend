import { useForm } from "react-hook-form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../../../firebase-config.js";
import {
    Flex,
    Text,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Button,
    Input,
    Link,
    RadioGroup,
    Radio,
    Stack,
    useToast
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { axiosPostRequest } from "../../../apiHelper.js";

const auth = getAuth(app);
/* Need to Handle and display error messages of firebase and form validations properly
   Store Access token and other details on client side */

async function CreateUser(values, navigate, toast) {
    console.log(values.email);
    let message = "Something went wrong"
    let status = "error"
    let title = ""
    const { email, password, cpassword, type, name } = values;
    if(password === cpassword){

        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user;
            const body = {
                name: name,
                email: email
            }
            const data = await axiosPostRequest(`/${type}/create`, body)
            message = "SignUp Successfull"
            status = "success"
            navigate(`/${type}/profile`)
        }
        catch(error) {
            status = "error"
            message = "Something went wrong"
            const errCode = error.code
            if(errCode === 'auth/email-already-in-use'){
                message = "User already registered please login to continue"
            }
        }
    }
    else{
        message = "password does not match"
        status = "error"
    }
    return (
        toast({
                title : title,
                description: message,
                variant: "top-accent",
                status: status,
                duration: 5000,
                isClosable: true,
            }
        )
    )
};

export default function SignUpForm() {
    const toast = useToast()
    const navigate = useNavigate();
    const {
        handleSubmit,
        register,
        formState: { isSubmitting },
    } = useForm();

    return (
        <Box w={["100vw", "100vw", "50vw"]} h="100%" align="center">
            <form onSubmit={handleSubmit((data) => CreateUser(data, navigate, toast))}>
                <Heading variant="main" color="primary">
                    Create your account
                </Heading>
                <Text>Enter your details to create your account</Text>
                <FormControl pt="5vh" w="80%">
                    <FormLabel>Name</FormLabel>
                    <Input
                        id="name"
                        placeholder="Name"
                        type="text" required
                        {...register("name")}
                    />
                    <FormLabel>Email</FormLabel>
                    <Input
                        id="email"
                        placeholder="Email"
                        type="email" required
                        {...register("email")}
                    />
                    <Flex
                        justify="space-between"
                        direction={["column", "column", "row"]}
                    >
                        <Box w={["100%", "100%", "47%"]}>
                            <FormLabel>Password</FormLabel>
                            <Input
                                id="pass"
                                placeholder="Password"
                                type="password" required
                                {...register("password")}
                            />
                        </Box>
                        <Box w={["100%", "100%", "47%"]}>
                            <FormLabel>Confirm Password</FormLabel>
                            <Input
                                id="cpass"
                                placeholder="Confirm password"
                                type="password" required
                                {...register("cpassword")}
                            />
                        </Box>
                    </Flex>
                    <Flex mt="2vh" align={"center"}>
                        <FormLabel>Register as</FormLabel>
                        <RadioGroup id="role" defaultValue="student" name="type" {...register("type")}>
                            <Stack direction="row">
                                <Radio colorScheme="orange" name="student" value="student">
                                    Student
                                </Radio>
                                <Radio colorScheme="orange" name="alumni" value="alumni">
                                    Alumni
                                </Radio>
                            </Stack>
                        </RadioGroup>
                    </Flex>
                </FormControl>
                <Button type="submit" variant="auth" isLoading={isSubmitting}>Sign up</Button>
                <Text fontWeight={600} mt="4vh">
                    Already have account?{" "}
                    <Link href="signin" color="primary">
                        Sign In
                    </Link>
                </Text>
            </form>
        </Box>
    );
}
