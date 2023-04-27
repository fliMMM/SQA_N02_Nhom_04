import {
  Paper,
  Box,
  TextField,
  Stack,
  Button,
  Typography,
  FormHelperText,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../slices/userSlice";
import User from "../../models/user.model";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";

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
  const { user, errorMessage, isLoading, isError } = useSelector(
    (state: any) => state.user
  );

  const handleLogin = async (data: FormData) => {
    const _data = await dispatch(login(data));
    // console.log(_data.payload.success);

    if (_data.user !== null) {
      navigate("/");
    }
    if (_data.payload.success === false) {
      alert(errorMessage);
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
            startIcon={
              isLoading === true ? (
                <CircularProgress size={15} sx={{ color: "white" }} />
              ) : (
                <></>
              )
            }
            type="submit"
            disabled={isLoading}
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
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Box>
  );
}

export default Login;
