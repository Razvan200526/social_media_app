import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type * as z from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUserContext } from "@/context/AuthContext";
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { SignInValidation } from "@/lib/validation";
import { Loader } from "../../components/shared/Loader";

const SignInForm = () => {
	const { mutateAsync: signInAccount } = useSignInAccount();
	const {
		checkAuthUser,
		isLoading: isUserLoading,
		isAuthentificated,
	} = useUserContext();
	const navigate = useNavigate();

	const form = useForm<z.infer<typeof SignInValidation>>({
		resolver: zodResolver(SignInValidation),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof SignInValidation>) {
		try {
			const session = await signInAccount({
				email: values.email,
				password: values.password,
			});

			if (!session) {
				return toast("Sign in failed, please try again.");
			}

			const isLoggedIn = await checkAuthUser();
			if (isLoggedIn) {
				form.reset();
				navigate("/");
			} else {
				toast("Sign in failed. Please try again.");
			}
		} catch (error) {
			console.log(error);
			toast("Sign in failed. Please try again.");
		}
	}
	return (
		<Form {...form}>
			<div className="sm:w-420 flex-center flex-col">
				<img src="/assets/images/logo.svg" alt="logo" />
				<h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
					Log in to your account
				</h2>
				<p className="text-light-3 small-medium md:base-regular mt-2">
					Welcome back!Please enter your details.
				</p>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-5 w-full mt-4"
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										type="email"
										className="shad-input"
										{...field}
										autoComplete="email"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										type="password"
										className="shad-input"
										{...field}
										autoComplete="current-password"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit" className="shad-button_primary">
						{isUserLoading ? (
							<div className="flex-center gap-2">
								<Loader />
							</div>
						) : (
							"Sign In"
						)}
					</Button>
				</form>
			</div>
			<p className="text-small-regular text-light-2 text-center mt-2">
				Don't have an account?
				<Link
					to={"/sign-up"}
					className="text-primary-500 ml-1 text-small-semi-bold"
				>
					Sign Up
				</Link>
			</p>
		</Form>
	);
};

export default SignInForm;
