import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { userLogin } from '../../redux/Public/AuthSlice';
import { emailValidator, passwordValidator } from './Validators';
import { Loader2 } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const dispatch = useDispatch();
  const redirect = new URLSearchParams(search).get('redirect') || '/';

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values) => {
    await dispatch(userLogin(values)).unwrap();
    navigate(redirect);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Helmet>
        <title>Login</title>
      </Helmet>

      <Card className="w-full max-w-md bg-white shadow-2xl border-0 rounded-xl">
        <CardHeader className="space-y-2 text-center pb-6">
          <CardTitle className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome back
          </CardTitle>
          <p className="text-sm text-gray-600 font-medium">
            Enter your credentials to continue
          </p>
        </CardHeader>

        <CardContent className="px-11">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                rules={{
                  required: 'Email is required',
                  validate: emailValidator,
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-700">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter your email"
                        className="h-11 border-gray-300 focus:border-red-500 focus:ring-red-500"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage className="text-red-600 font-medium" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                rules={{
                  required: 'Password is required',
                  validate: passwordValidator,
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-700">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter your password"
                        className="h-11 border-gray-300 focus:border-red-500 focus:ring-red-500"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage className="text-red-600 font-medium" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-red-400 to-red-500 hover:opacity-90
                transition-all shadow-lg shadow-red-500/30 text-white font-semibold text-base rounded-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                ) : null}
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </Button>

              <div className="text-center text-sm mt-4">
                <span className="text-gray-600">New customer? </span>
                <Link
                  to={`/register?redirect=${redirect}`}
                  className="text-red-500 hover:text-red-600 font-semibold hover:underline"
                >
                  Create your account
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
