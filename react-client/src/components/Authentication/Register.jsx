import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
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
import { register } from '../../Services/UserService';
import { emailValidator, passwordValidator } from './Validators';
import { Loader2 } from 'lucide-react';
import { getError } from '../../utils/utils';

export default function Register() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirect = new URLSearchParams(search).get('redirect') || '/';

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values) => {
    if (values.password !== values.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      await register(values.email, values.name, values.password);
      navigate(redirect || '/login');
      toast.success('Registration successful! Please login.');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Helmet>
        <title>Register</title>
      </Helmet>

      <Card className="w-full max-w-md bg-white shadow-2xl border-0 rounded-xl">
        <CardHeader className="space-y-2 text-center pb-6">
          <CardTitle className="text-3xl font-bold tracking-tight text-gray-900">
            Create an account
          </CardTitle>
          <p className="text-sm text-gray-600 font-medium">
            Enter your details to get started
          </p>
        </CardHeader>

        <CardContent className="px-11">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                rules={{ required: 'Name is required' }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-700">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your full name"
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
                        placeholder="Create a password"
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
                name="confirmPassword"
                rules={{
                  required: 'Please confirm your password',
                  validate: (value) =>
                    value === form.getValues('password') ||
                    'Passwords do not match',
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-700">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Confirm your password"
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
                {isSubmitting ? 'Creating account...' : 'Create account'}
              </Button>

              <div className="text-center text-sm mt-4">
                <span className="text-gray-600">Already have an account? </span>
                <Link
                  to={`/login?redirect=${redirect}`}
                  className="text-red-500 hover:text-red-600 font-semibold hover:underline"
                >
                  Sign in
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
