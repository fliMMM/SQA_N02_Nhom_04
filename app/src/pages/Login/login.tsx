import {
  Paper,
  Box,
  TextField,
  Stack,
  Button,
  Typography,
  FormHelperText,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../slices/userSlice";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup
  .object({
    phoneNumber: yup
      .string()

      .required("Không được để trống số điện thoại")
      .matches(phoneRegExp, "Hãy nhập đúng số điện thoại!"),
    password: yup.string().required("Không được để trống mật khẩu"),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

interface UserState {
  user: object
}

function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const user = useSelector((state: UserState) => state.user);
 
  const handleLogin = async (data: FormData) => {
    const loginData = {
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    };
    // localStorage.setItem("user", "1");
    // navigate("/");
    const user = await dispatch(login(loginData)).unwrap();
    console.log(user);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "& > :not(style)": {
          m: 10,
          p: 2,
        },
      }}
    >
      <Paper
        component={"form"}
        onSubmit={handleSubmit((data) => {
          handleLogin(data);
        })}
        elevation={3}
      >
        <Stack spacing={2}>
          <Typography textAlign={"center"} variant="h6">
            Đăng nhập
          </Typography>
          <TextField
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            label="Số điện thoại"
            {...register("phoneNumber", { required: true })}
          />
          {errors.phoneNumber && (
            <FormHelperText id="my-helper-text" sx={{ color: "red" }}>
              {errors.phoneNumber?.message}
            </FormHelperText>
          )}
          <TextField label="Mật khẩu" {...register("password")} />
          <FormHelperText id="my-helper-text" sx={{ color: "red" }}>
            {errors.password?.message}
          </FormHelperText>
          <Link to={"/register"}>Đăng kí</Link>
          <Button
            type="submit"
            sx={{
              backgroundColor: "rgb(34,54,113)",
              color: "white",
              ":hover": {
                backgroundColor: "#F58C5C",
              },
            }}
          >
            Đăng nhập
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

export default Login;
