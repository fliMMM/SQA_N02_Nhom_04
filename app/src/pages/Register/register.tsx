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
import { useDispatch, useSelector } from "react-redux";
import User from "../../models/user.model";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../app/store";
import { useEffect } from "react";
import useNotis from "../../hook/noti";
import { removeError } from "../../slices/userSlice";

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
    fullname: yup.string().required("Không được để trống trường này"),
    address: yup.string().required("Không được để trống trường này"),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

interface FormInputs {
  label: string;
  name: keyof FormData;
  type?: string;
}

const formInputs: FormInputs[] = [
  {
    label: "Họ và tên",
    name: "fullname",
  },
  {
    label: "Email",
    name: "email",
  },
  {
    label: "Mã khách hàng",
    name: "userCode",
  },
  {
    label: "Địa chỉ",
    name: "address",
  },
  {
    label: "Mật khẩu",
    name: "password",
    type: "password",
  },
  {
    label: "Xác nhận mật khẩu",
    name: "confirmPassword",
    type: "password",
  },
];

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
      address: "",
      fullname: "",
    },
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch<AppDispatch>();
  const noti = useNotis();
  const navigate = useNavigate();
  const { isError, isLoading, errorMessage } = useSelector(
    (state: RootState) => state.user
  );

  const handleLogin = async (data: User) => {
    console.log(data);

    const _data = await dispatch(_register(data)).unwrap();
    console.log(_data);
    if (_data.success === true) {
      navigate("/");
    }
  };

  useEffect(() => {
    if (isError) {
      noti(errorMessage, 'error');
      dispatch(removeError());
    }
  }, [isError]);

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
        sx={{ width: "400px", minWidth: "300px" }}
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
          {formInputs.map((input, index) => {
            return (
              <>
                <TextField
                  // inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  label={input.label}
                type={input?.type}
                  {...register(input.name, { required: true })}
                />
                {errors[input.name] && (
                  <FormHelperText id="my-helper-text" sx={{ color: "red" }}>
                    {errors[input.name]?.message}
                  </FormHelperText>
                )}
              </>
            );
          })}
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
