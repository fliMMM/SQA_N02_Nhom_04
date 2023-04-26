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

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup
  .object({
    phoneNumber: yup
      .string()

      .required("Không được để trống số điện thoại")
      .matches(phoneRegExp, "Hãy nhập đúng số điện thoại!"),
    password: yup.string().required("Không được để trống mật khẩu"),
    confirmPassword: yup
      .string()
      .required("Không được để trống mật khẩu")
      .oneOf([yup.ref("password")], "Mật khẩu không khớp"),
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
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const handleLogin = async (data: FormData) => {
    console.log(data);

    // localStorage.setItem("user", "1");
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
