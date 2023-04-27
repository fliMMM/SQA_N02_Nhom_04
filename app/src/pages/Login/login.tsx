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
import User from "../../models/user.model";

const emailRegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const schema = yup
  .object({
    email: yup
      .string()

      .required("Không được để trống email")
      .matches(emailRegExp, "Hãy nhập đúng định dạng email!"),
    password: yup.string().required("Không được để trống mật khẩu"),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { user, errorMessage, isError } = useSelector((state: any) => state.user);

  console.log(errorMessage);
  
  const handleLogin = async (data: FormData) => {
    await dispatch(login(data));
    
    if (user) {
      navigate("/");
    } else {
      console.log(errorMessage);
    }
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
            // inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            label="Email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <FormHelperText id="my-helper-text" sx={{ color: "red" }}>
              {errors.email?.message}
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
