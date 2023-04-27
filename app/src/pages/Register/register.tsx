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
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { _register } from "../../slices/userSlice";
import { useDispatch } from "react-redux";
import User from "../../models/user.model";
import { useNavigate } from "react-router-dom";

const emailRegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const schema = yup
  .object({
    email: yup
      .string()

      .required("Không được để trống email")
      .matches(emailRegExp, "Email không hợp lệ!"),
    password: yup.string().required("Không được để trống mật khẩu"),
    confirmPassword: yup
      .string()
      .required("Không được để trống mật khẩu")
      .oneOf([yup.ref("password")], "Mật khẩu không khớp"),
    userCode: yup.string().required("Không được để trống mã khách hàng"),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      userCode: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const handleLogin = async (data: User) => {
    // console.log(data);

    const _data = await dispatch(_register(data)).unwrap();
    if (_data.user) {
      navigate("/")
    } else {
      alert("tài khoản đã tồn tại")
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
            Đăng ký
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

          <TextField
            // inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            label="Mã khách hàng"
            {...register("userCode", { required: true })}
          />
          {errors.userCode && (
            <FormHelperText id="my-helper-text" sx={{ color: "red" }}>
              {errors.userCode?.message}
            </FormHelperText>
          )}

          <TextField label="Mật khẩu" {...register("password")} />
          {errors.password && (
            <FormHelperText id="my-helper-text" sx={{ color: "red" }}>
              {errors.password?.message}
            </FormHelperText>
          )}

          <TextField
            label="Xác nhận mật khẩu"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <FormHelperText id="my-helper-text" sx={{ color: "red" }}>
              {errors.confirmPassword?.message}
            </FormHelperText>
          )}
          <Link to={"/login"}>Đăng nhập</Link>
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
            Đăng Kí
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

export default Register;
