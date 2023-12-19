"use client";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "@/components";
import { useToast } from "@/hooks";
import { cn } from "@/lib/utils";
import {
  useRegisterMutation,
  useUserExistMutation,
} from "@/store/slices/authSlice";
import { APIActionResponse, Auth } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
interface IFormInputs {
  name: string;
  email: string;
  password: string;
}
const Page = () => {
  const [registerMutation] = useRegisterMutation();
  const [userExistMutation] = useUserExistMutation();
  const { toast } = useToast();

  const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const resUserExist = (await userExistMutation({
      email: data.email,
    })) as APIActionResponse<Auth>;
    const { user, message } = resUserExist.data;

    if (user) {
      toast({
        title: message,
        description:
          "The email you entered already exists, you can log in by email",
        variant: "destructive",
      });
      return null;
    }

    await registerMutation({
      name: data.name,
      email: data.email,
      password: data.password,
    }).then(async () => {
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
    });
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome Friend, Lets Sign up </CardTitle>
        <CardDescription>Please enter valid data</CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Controller
                name={"name"}
                control={control}
                render={({ field }) => (
                  <>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      className={cn("focus-visible:ring-0", {
                        "border-destructive": errors.name?.message,
                      })}
                      placeholder="John Deo"
                      {...field}
                    />
                    <p className="text-destructive">{errors.name?.message}</p>
                  </>
                )}
              />
              <Controller
                name={"email"}
                control={control}
                render={({ field }) => (
                  <>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="text"
                      className={cn("focus-visible:ring-0", {
                        "border-destructive": errors.email?.message,
                      })}
                      placeholder="johndeo@example.com"
                      {...field}
                    />
                    <p className="text-destructive">{errors.email?.message}</p>
                  </>
                )}
              />
              <Controller
                name={"password"}
                control={control}
                render={({ field }) => (
                  <>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      className={cn("focus-visible:ring-0", {
                        "border-destructive": errors.password?.message,
                      })}
                      placeholder="********"
                      {...field}
                    />
                    <p className="text-destructive">
                      {errors.password?.message}
                    </p>
                  </>
                )}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button disabled={!isDirty || !isValid || isSubmitting}>
            Sign up
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
export default Page;
