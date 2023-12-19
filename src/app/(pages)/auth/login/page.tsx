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
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
interface IFormInputs {
  email: string;
  password: string;
}
const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  const { toast } = useToast();

  const schema = yup.object({
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
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (res?.error) {
      return toast({
        title: res?.error,
        variant: "destructive",
      });
    }
    router.replace(`${pathname}?${params.get("callbackUrl")}`);
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>Enter your data to login</CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-x-2">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
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
          <Button disabled={!isDirty || !isValid || isSubmitting}>Login</Button>
        </CardFooter>
      </form>
    </Card>
  );
};
export default Page;
